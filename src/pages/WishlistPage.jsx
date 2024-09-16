import { useState } from "react";
import { Table, Dropdown, Button, Image, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../rtl/slices/wishlistSlice";
import { Heart } from "lucide-react";

export default function WishlistPage() {
 const { products } = useSelector((state) => state.wishlist);
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
   <div className="d-flex justify-content-between my-4   ">
    <h1>
     WishList <Heart className="hart-full-btn" />{" "}
    </h1>
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
        <th>Actions</th>
       </tr>
      </thead>
      <tbody>
       {currentProducts.map((product, index) => (
        <tr key={product.id}>
         <td>{indexOfFirstProduct + index + 1}</td>
         <td>
          <Image
           onClick={() => handelShow(product.id)}
           src={product.thumbnail}
           alt={product.title}
           thumbnail
           style={{ width: "50px", height: "50px" }}
          />
         </td>
         <td>{product.title}</td>
         <td>{product.category}</td>
         <td>{product.price}</td>
         <td>{product.stock}</td>

         <td>
          <Heart
           onClick={() => dispatch(removeFromWishlist(product.id))}
           className="hart-full-btn"
          />{" "}
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
