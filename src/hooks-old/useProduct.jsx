import { useState, useEffect } from "react";
import axios from "axios";

const useProduct = (id) => {
 const [product, setProduct] = useState(null);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  setLoading(true);
  const fetchProduct = async () => {
   try {
    const response = await axios.get(
     `${import.meta.env.VITE_PRODUCTS_ENDPOINT}/${id}`
    );
    setProduct(response.data);
   } catch (error) {
    console.error(error);
    setError("Error fetching product data");
   } finally {
    setLoading(false);
   }
  };

  if (id) {
   fetchProduct();
  }
 }, [id]);

 return { product, error, loading };
};

export default useProduct;
