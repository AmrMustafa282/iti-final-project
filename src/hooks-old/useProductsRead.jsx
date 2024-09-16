import { useState, useEffect } from "react";
import axios from "axios";

const useProductsRead = () => {
 const [products, setProducts] = useState(null);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  setLoading(true);
  const fetchProducts = async () => {
   try {
    const response = await axios.get(
     `${import.meta.env.VITE_PRODUCTS_ENDPOINT}`
    );
    setProducts(response.data);
    // console.log(response.data);
   } catch (error) {
    console.error(error);
    setError("Error fetching product data");
   } finally {
    setLoading(false);
   }
  };

  fetchProducts();
 }, []);

 return { products, error, loading };
};

export default useProductsRead;
