import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function Modal({
 product,
 updateProduct,
 createProduct,
 setShowModal,
}) {
 const [title, setTitle] = useState(product ? product.title : "");
 const [price, setPrice] = useState(product ? product.price : "");
 console.log("product", product);

 useEffect(() => {
  setTitle(product ? product.title : "");
  setPrice(product ? product.price : "");
 }, [product]);

 return (
  <>
   <div className="row gap-3">
    <div className="d-flex gap-3 ">
     <label>Title</label>
     <input
      className="w-50 p-2 "
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
     />
    </div>
    <div className="d-flex gap-3 ">
     <label htmlFor="">Price</label>
     <input
      className="w-50 p-2 "
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
     />
    </div>
    <Button
     variant="primary"
     onClick={() => {
      product
       ? updateProduct(product.id, { ...product, title, price })
       : createProduct({ title, price });
      setShowModal(false);
     }}
    >
     {product ? "Update existing product" : "Add New Product"}
    </Button>
   </div>
  </>
 );
}
