import React, { useEffect } from "react";
import Product from "./Product";
import axios from "axios";

export default function ProductsList() {
 const [products, setProducts] = React.useState([]);

 const fetchProducts = async () => {
  try {
   const res = await axios.get(import.meta.env.VITE_PRODUCTS_ENDPOINT);
   setProducts(res.data);
   //  console.log(res.data);
  } catch (error) {
   throw new Error("Failed to fetch products", error);
  }
 };

 useEffect(() => {
  fetchProducts();
 }, []);
 return (
  <div className="d-flex flex-wrap gap-4 justify-content-center">
   {products
    .filter((product) => ["beauty", "fragrances"].includes(product.category))
    .map((product) => (
     <Product key={product.id} product={product} />
    ))}
  </div>
 );
}
