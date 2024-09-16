import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../context/usersContext";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

export default function Login() {
 const { onLogin } = useUsers();
 const [user, setUser] = useState({
  email: "",
  password: "",
  role: "user",
 });
 const [errors, setErrors] = useState({});

 const validateForm = () => {
  const newErrors = {};
  if (!user.email) newErrors.email = "Email is required";
  if (!user.password) newErrors.password = "Password is required";
  if (!user.email.includes("@")) newErrors.email = "Invalid email address";
  return newErrors;
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length === 0) {
   try {
    onLogin(user);
   } catch (error) {
    toast.error(error.message);
   }
  } else {
   setErrors(validationErrors);
  }
 };

 return (
  <div className="container-fluid my-auto">
   <div className="row">
    <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
     <img src="/login.jpg" alt="Placeholder" className="img-fluid" />
    </div>

    <div className="col-md-6 d-flex align-items-center justify-content-center">
     <div className="p-4 w-75">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
       <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input
         type="text"
         className={`form-control ${errors.email ? "is-invalid" : ""}`}
         name="email"
         id="email"
         value={user.email}
         onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
       </div>

       <div className="form-group mb-3">
        <label htmlFor="password">Password</label>
        <input
         type="password"
         className={`form-control ${errors.password ? "is-invalid" : ""}`}
         name="password"
         id="password"
         value={user.password}
         onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {errors.password && (
         <div className="invalid-feedback">{errors.password}</div>
        )}
       </div>

       <div className="form-group mb-3">
        <label>Role</label>
        <div className="form-check">
         <input
          className="form-check-input"
          type="radio"
          name="role"
          value="user"
          id="user"
          checked={user.role === "user"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
         />
         <label className="form-check-label" htmlFor="user">
          User
         </label>
        </div>
        <div className="form-check">
         <input
          className="form-check-input"
          type="radio"
          name="role"
          value="admin"
          id="admin"
          checked={user.role === "admin"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
         />
         <label className="form-check-label" htmlFor="admin">
          Admin
         </label>
        </div>
       </div>

       <button type="submit" className="btn btn-success w-100 mt-3">
        Login
       </button>
       <p className="pt-2 text-center">
        Don&apos;t have an account?{" "}
        <Link className="text-primary text-decoration-underline" to="/signup">
         Sign Up
        </Link>
       </p>
      </form>
     </div>
    </div>
   </div>
  </div>
 );
}
