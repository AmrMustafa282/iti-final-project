import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../rtl/slices/cartSlice";
import { useUsers } from "../context/usersContext";
import { addToWishlist } from "../rtl/slices/wishlistSlice";
import toast from "react-hot-toast";
export default function Product({ product, cartItem, className }) {
 const nav = useNavigate();
 const dispatch = useDispatch();
 const { currentUser } = useUsers();
 const { products: wishlistProducts } = useSelector((state) => state.wishlist);

 return (
  <div className={className}>
   {product && (
    <Card style={{ width: "18rem", height: "31rem" }} className="text-start   ">
     <Card.Img
      variant="top"
      src={product?.images[0]}
      onClick={() => nav(`/products/${product?.id}`)}
     />
     <Card.Body>
      <Card.Title>{product?.title}</Card.Title>
      <div className="d-flex gap-2 align-items-center mb-2 ">
       {product?.tags?.map((tag) => (
        <Badge key={tag} bg="secondary">
         {tag}
        </Badge>
       ))}
      </div>
      <p>${product?.price}</p>
     </Card.Body>
     <Card.Footer className="d-flex justify-content-between">
      <button
       onClick={(e) => {
        e.stopPropagation();
        if (currentUser) {
         dispatch(cartItem ? removeFromCart(product) : addToCart(product));
         toast.success(
          cartItem ? "Item removed from cart" : "Item added to cart"
         );
        } else {
         nav("/login");
        }
       }}
      >
       {cartItem ? <Trash2 /> : <ShoppingCart />}
      </button>
      <button
       onClick={(e) => {
        e.stopPropagation();
        dispatch(addToWishlist(product));
        toast.success(
         wishlistProducts.find((item) => item.id === product.id)
          ? "Item removed from wishlist"
          : "Item added to wishlist"
        );
       }}
      >
       <Heart
        className={
         wishlistProducts.find((item) => item.id === product.id)
          ? "hart-full-btn"
          : ""
        }
       />
      </button>
     </Card.Footer>
    </Card>
   )}
  </div>
 );
}
