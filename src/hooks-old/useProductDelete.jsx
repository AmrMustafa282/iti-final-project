import { useState } from "react";
import axios from "axios";

const useProductDelete = () => {
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

 const deleteProduct = async (id) => {
  setLoading(true);
  try {
   await axios.delete(`${import.meta.env.VITE_PRODUCTS_ENDPOINT}/${id}`);
  } catch (error) {
   console.error(error);
   setError("Error fetching product data");
  } finally {
   setLoading(false);
  }
 };

 return { deleteProduct, error, loading };
};

export default useProductDelete;
