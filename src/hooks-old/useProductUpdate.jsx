import { useState } from "react";
import axios from "axios";

const useProductUpdate = () => {
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(true);

 const updateProduct = async (id, product) => {
  setLoading(true);
  try {
   await axios.patch(`${import.meta.env.VITE_PRODUCTS_ENDPOINT}/${id}`, {
    ...product,
   });
   //  setNewProduct(response.data);
  } catch (error) {
   console.error(error);
   setError("Error fetching product data");
  } finally {
   setLoading(false);
  }
 };

 return { updateProduct, error, loading };
};

export default useProductUpdate;
