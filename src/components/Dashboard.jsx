import { useEffect, useState } from "react";
import { Table, Dropdown, Button, Image, Pagination } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "./Modal";
import { useUsers } from "../context/usersContext";
import { useProducts } from "../context/productsContext";

export default function Dashboard() {
 const [searchParams, setSearchParams] = useSearchParams({ tap: "products" });
 const { products } = useProducts();
 const { users, onDeleteUesr } = useUsers();
 const [currentPage, setCurrentPage] = useState(1);
 const [showModal, setShowModal] = useState(false);
 const [currentProduct, setCurrentProduct] = useState(null);
 const productsPerPage = 10;
 const nav = useNavigate();

 const { deleteProduct, updateProduct, createProduct } = useProducts();

 const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 const currentArray = searchParams.get("tap") === "products" ? products : users;
 const currentProducts = currentArray?.slice(
  indexOfFirstProduct,
  indexOfLastProduct
 );
 const totalPages = Math.ceil(currentArray?.length / productsPerPage);

 const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

 const handelShow = (id) => {
  nav(`/products/${id}`);
 };

 console.log(users);
 useEffect(() => {
  searchParams.set("tap", "products");
  setSearchParams(searchParams);
 }, []);

 return (
  <div className="w-100">
   <div className="row">
    <div
     className="col-2 d-flex flex-column gap-2 py-3 rounded   "
     style={{ backgroundColor: "#f1f1f1" }}
    >
     <button
      style={
       searchParams.get("tap") === "products"
        ? { backgroundColor: "gainsboro" }
        : {}
      }
      className="py-2 px-2 rounded"
      onClick={() => {
       searchParams.set("tap", "products");
       setSearchParams(searchParams);
      }}
     >
      Products
     </button>
     <button
      style={
       searchParams.get("tap") === "users"
        ? { backgroundColor: "gainsboro" }
        : {}
      }
      className="py-2 px-2 rounded"
      onClick={() => {
       searchParams.set("tap", "users");
       setSearchParams(searchParams);
      }}
     >
      Users
     </button>
    </div>
    <div className="col-10">
     {searchParams.get("tap") === "products" && (
      <>
       <div className="d-flex justify-content-between mb-4   ">
        <h1>Product Dashboard</h1>
        <Button
         onClick={() => {
          setCurrentProduct(null);
          setShowModal(true);
         }}
        >
         Create New Product
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
            <th>Rating</th>
            <th>Actions</th>
           </tr>
          </thead>
          <tbody>
           {currentProducts?.map((product, index) => (
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
             <td>${product.price}</td>
             <td>{product.stock}</td>
             <td>{product.rating}</td>
             <td>
              <Dropdown>
               <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Actions
               </Dropdown.Toggle>
               <Dropdown.Menu>
                <Dropdown.Item onClick={() => handelShow(product.id)}>
                 Show
                </Dropdown.Item>
                <Dropdown.Item
                 onClick={() => {
                  setCurrentProduct(product);
                  setShowModal(true);
                 }}
                >
                 Update
                </Dropdown.Item>
                <Dropdown.Item onClick={() => deleteProduct(product.id)}>
                 Delete
                </Dropdown.Item>
               </Dropdown.Menu>
              </Dropdown>
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
       <div className="text-end mt-4"></div>
       <div>
        {showModal && (
         <Modal
          product={currentProduct}
          updateProduct={updateProduct}
          createProduct={createProduct}
          setShowModal={setShowModal}
         />
        )}
       </div>
      </>
     )}
     {searchParams.get("tap") === "users" && (
      <>
       <div className="d-flex justify-content-between mb-4   ">
        <h1>Users Dashboard</h1>
       </div>
       {products && users && (
        <>
         <Table striped bordered hover responsive="sm">
          <thead>
           {/* {{
          email: "amr@me.com",
          firstName: "amr",
          id: "2371",
          lastName: "mustafa",
          password: "123",
          role: "admin",
         }} */}
           <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>ID</th>
            <th>Actions</th>
           </tr>
          </thead>
          <tbody>
           {users?.map((user, index) => (
            <tr key={user.id}>
             <td>{indexOfFirstProduct + index + 1}</td>

             <td>{user.firstName}</td>
             <td>{user.lastName}</td>
             <td>{user.email}</td>
             <td>{user.role}</td>
             <td>{user.id}</td>

             <td>
              <Button variant="danger" onClick={() => onDeleteUesr(user.id)}>
               Delete
              </Button>
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
      </>
     )}
    </div>
   </div>
  </div>
 );
}
