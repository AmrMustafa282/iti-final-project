import { useState } from "react";
import axios from "axios";

const useProductCreate = () => {
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

 const createProduct = async (product) => {
  setLoading(true);
  try {
   await axios.post(`${import.meta.env.VITE_PRODUCTS_ENDPOINT}`, {
    ...product,
   });
  } catch (error) {
   console.error(error);
   setError("Error create product ");
  } finally {
   setLoading(false);
  }
 };

 return { createProduct, error, loading };
};

export default useProductCreate;
