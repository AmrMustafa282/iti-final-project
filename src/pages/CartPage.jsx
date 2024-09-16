import { useState } from "react";
import {
 Table,
 Dropdown,
 Button,
 Image,
 Pagination,
 ButtonGroup,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
 decreaseAmount,
 increaseAmount,
 removeFromCart,
} from "../rtl/slices/cartSlice";
import { Info, InfoIcon, Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
 const { products } = useSelector((state) => state.cart);
 const [currentPage, setCurrentPage] = useState(1);

 const productsPerPage = 10;
 const nav = useNavigate();

 const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 const currentProducts = products?.slice(
  indexOfFirstProduct,
  indexOfLastProduct
 );
 const totalPages = Math.ceil(products?.length / productsPerPage);

 const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

 const handelShow = (id) => {
  nav(`/products/${id}`);
 };

 const dispatch = useDispatch();

 return (
  <div className="w-100">
   <div className="d-flex  justify-content-between my-4   ">
    <h1>Shopping Cart</h1>
    <Button
     onClick={() => {
      nav("/home");
     }}
    >
     Explore More Products
    </Button>
   </div>
   {products && (
    <>
     <Table striped bordered hover responsive="sm">
      <thead>
       <tr>
        <th>#</th>
        <th>Image</th>
        <th>Title</th>
        <th>Category</th>
        <th>Price</th>
        <th>Stock</th>

        <th>Total</th>
        <th>Actions</th>
       </tr>
      </thead>
      <tbody>
       {currentProducts.map((product, index) => (
        <tr key={product.id}>
         <td>{indexOfFirstProduct + index + 1}</td>
         <td>
          <Image
           src={product.thumbnail}
           alt={product.title}
           thumbnail
           style={{ width: "50px", height: "50px" }}
          />
         </td>
         <td>{product.title}</td>
         <td>{product.category}</td>
         <td>
          ${product.price} x{product.amount}
         </td>
         <td>{product.stock}</td>
         <td>${Math.floor(product.amount * product.price)}</td>
         <td className="w-25">
          <div className="d-flex gap-2  justify-content-center">
           <Button
            variant="primary"
            onClick={() => handelShow(product.id)}
            title="Show Details"
           >
            <Info />
           </Button>
           <Button
            variant="light"
            disabled={product.amount === product.stock}
            onClick={() => dispatch(increaseAmount(product.id))}
            title="Increase Amount"
           >
            <Plus />
           </Button>
           <Button
            variant="light"
            onClick={() => dispatch(decreaseAmount(product.id))}
            title="Decrease Amount"
           >
            <Minus />
           </Button>
           <Button
            variant="danger"
            onClick={() => dispatch(removeFromCart(product.id))}
            title="Remove From Cart"
           >
            <Trash2 />
           </Button>
          </div>
         </td>
        </tr>
       ))}
      </tbody>
     </Table>

     <Pagination>
      <Pagination.First
       onClick={() => handlePageChange(1)}
       disabled={currentPage === 1}
      />
      <Pagination.Prev
       onClick={() => handlePageChange(currentPage - 1)}
       disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, index) => (
       <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => handlePageChange(index + 1)}
       >
        {index + 1}
       </Pagination.Item>
      ))}
      <Pagination.Next
       onClick={() => handlePageChange(currentPage + 1)}
       disabled={currentPage === totalPages}
      />
      <Pagination.Last
       onClick={() => handlePageChange(totalPages)}
       disabled={currentPage === totalPages}
      />
     </Pagination>
    </>
   )}
  </div>
 );
}
