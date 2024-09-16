import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// 1) CREATE A CONTEXT
const ProductsContext = createContext();

function ProductsProvider({ children }) {
 const [products, setProducts] = useState(null);

 const getProducts = async () => {
  const res = await axios.get(import.meta.env.VITE_PRODUCTS_ENDPOINT);
  setProducts(res.data);
 };

 const createProduct = async (product) => {
  try {
   await axios.post(`${import.meta.env.VITE_PRODUCTS_ENDPOINT}`, {
    ...product,
    id: products?.length + 1 || 1,
   });
   getProducts();
  } catch (error) {
   console.error(error);
  }
 };
 const fetchProduct = async (id) => {
  let product;
  try {
   const res = await axios.get(
    `${import.meta.env.VITE_PRODUCTS_ENDPOINT}/${id}`
   );
   product = res.data;
  } catch (error) {
   console.error(error);
  }
  return product;
 };

 const deleteProduct = async (id) => {
  try {
   await axios.delete(`${import.meta.env.VITE_PRODUCTS_ENDPOINT}/${id}`);
   getProducts();
  } catch (error) {
   console.error(error);
  }
 };
 const updateProduct = async (id, product) => {
  try {
   await axios.patch(`${import.meta.env.VITE_PRODUCTS_ENDPOINT}/${id}`, {
    ...product,
   });
   getProducts();
  } catch (error) {
   console.error(error);
  }
 };
 useEffect(() => {
  getProducts();
 }, []);

 const value = useMemo(() => {
  return {
   products,
   createProduct,
   fetchProduct,
   deleteProduct,
   updateProduct,
  };
 }, [createProduct, fetchProduct, deleteProduct, updateProduct]);

 return (
  <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
 );
}

function useProducts() {
 const context = useContext(ProductsContext);
 if (context === undefined)
  throw new Error("ProductsContext was used outside of the UserProvider");
 return context;
}

export { ProductsProvider, useProducts };
