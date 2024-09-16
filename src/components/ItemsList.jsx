import { useProducts } from "../context/productsContext";
import Product from "./Product";

export default function ItemsList() {
 const { products } = useProducts();

 return (
  <div className="container">
   <div className="d-flex justify-content-between flex-wrap ">
    {products
     ?.filter((item) => ["beauty"].includes(item.category) && item.rating > 3)
     .map((product) => (
      <div key={product.id} className=" mb-4">
       <Product product={product} key={product.id} className={"h-100"} />
      </div>
     ))}
   </div>
  </div>
 );
}
