import { NavLink } from "react-router-dom";
import { useUsers } from "../context/usersContext";
import { Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Header() {
 const { currentUser, onLogout } = useUsers();
 const { products: cartProducts } = useSelector((state) => state.cart);
 const { products: wishlistPorducts } = useSelector((state) => state.wishlist);
 return (
  <div>
   <div className="container mx-auto d-flex justify-content-between py-4">
    <img
     src="/logo.png"
     alt="logo"
     style={{ width: 50, height: 50 }}
    />
    <nav>
     <ul className="d-flex gap-4 align-items-center">
      <li>
       <NavLink to="/home">Home</NavLink>
      </li>
      <li>
       <NavLink to="/products">Products</NavLink>
      </li>
      <li>
       <NavLink to={"/cart"}>
        Cart
        {currentUser && (
         <Badge className="m-0 p-" bg="success">
          {cartProducts?.reduce((acc, cur) => acc + cur.amount, 0)}
         </Badge>
        )}
       </NavLink>
      </li>
      <li>
       <NavLink to={"/wishlist"}>
        Wishlist{" "}
        {currentUser && (
         <Badge className="m-0 p-" bg="warning">
          {wishlistPorducts?.length}
         </Badge>
        )}
       </NavLink>
      </li>
      {currentUser?.role === "admin" && (
       <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
       </li>
      )}
      {currentUser ? (
       <Button
        variant=""
        className="p-0"
        onClick={() => {
         onLogout();
        }}
       >
        SignOut
       </Button>
      ) : (
       <li>
        <NavLink to="/login">Login</NavLink>
       </li>
      )}
     </ul>
    </nav>
   </div>
  </div>
 );
}
