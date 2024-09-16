import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useProducts } from "../context/productsContext";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtl/slices/cartSlice";

export default function ProductDetails() {
 const dispatch = useDispatch();
 const { id } = useParams();
 const { fetchProduct } = useProducts();
 const [product, setProduct] = useState({});
 useEffect(() => {
  fetchProduct(id).then((data) => setProduct(data));
 }, [id, fetchProduct]);
 console.log(product);
 return (
  <Container className="mt-4">
   {product && (
    <Row>
     <Col md={6}>
      <Card>
       <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
       <Card.Body>
        <div className="product-images">
         {product.images?.map((img, idx) => (
          <img
           key={idx}
           src={img}
           alt={`Product Image ${idx + 1}`}
           className="img-thumbnail mr-2"
           style={{ width: "100px", height: "100px" }}
          />
         ))}
        </div>
       </Card.Body>
      </Card>
     </Col>

     <Col md={6}>
      <h1>{product.title}</h1>
      <h4 className="text-muted">{product.brand}</h4>
      <Badge bg="info" className="mb-2">
       Category: {product.category}
      </Badge>
      <p>{product.description}</p>

      <h3>
       Price: ${product.price}{" "}
       <small className="text-muted">
        (Discount: {product.discountPercentage}%)
       </small>
      </h3>
      <h5>
       Final Price: $
       {(
        product.price -
        (product.price * product.discountPercentage) / 100
       ).toFixed(2)}
      </h5>

      <div className="mt-3">
       <strong>Stock: </strong>{" "}
       {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
      </div>

      <div className="mt-2">
       <strong>Rating: </strong>
       <Badge bg="warning" text="dark">
        {product.rating} / 5
       </Badge>
      </div>

      <Button
       variant="primary"
       className="mt-4"
       onClick={() => dispatch(addToCart(product))}
      >
       Add to Cart
      </Button>
     </Col>
    </Row>
   )}
  </Container>
 );
}
