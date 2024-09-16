import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../context/usersContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "react-bootstrap";
import toast from "react-hot-toast";

export default function SignUp() {
 const { onSignUp } = useUsers();
 const [user, setUser] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "user",
 });
 const [errors, setErrors] = useState({});

 const handleChange = (e) => {
  setUser({ ...user, [e.target.id]: e.target.value });
 };

 const validateForm = () => {
  const newErrors = {};
  if (!user.firstName) newErrors.firstName = "First name is required";
  if (!user.lastName) newErrors.lastName = "Last name is required";
  if (!user.email) newErrors.email = "Email is required";
  if (!user.email.includes("@")) newErrors.email = "Invalid email address";
  if (!user.password) newErrors.password = "Password is required";
  if (user.password.length < 6)
   newErrors.password = "Password must be at least 6 characters";
  return newErrors;
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length === 0) {
   try {
    onSignUp(user);
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
     <img src="/signup.jpg" alt="Placeholder" className="img-fluid" />
    </div>

    <div className="col-md-6 d-flex align-items-center justify-content-center">
     <div className="p-4 w-75">
      <h2 className="mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
       <div className="form-group mb-3">
        <label htmlFor="firstName">First Name</label>
        <input
         type="text"
         className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
         id="firstName"
         value={user.firstName}
         onChange={handleChange}
        />
        {errors.firstName && (
         <div className="invalid-feedback">{errors.firstName}</div>
        )}
       </div>

       <div className="form-group mb-3">
        <label htmlFor="lastName">Last Name</label>
        <input
         type="text"
         className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
         id="lastName"
         value={user.lastName}
         onChange={handleChange}
        />
        {errors.lastName && (
         <div className="invalid-feedback">{errors.lastName}</div>
        )}
       </div>

       <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input
         type="text"
         className={`form-control ${errors.email ? "is-invalid" : ""}`}
         id="email"
         value={user.email}
         onChange={handleChange}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
       </div>

       <div className="form-group mb-3">
        <label htmlFor="password">Password</label>
        <input
         type="password"
         className={`form-control ${errors.password ? "is-invalid" : ""}`}
         id="password"
         value={user.password}
         onChange={handleChange}
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
          id="role-user"
          checked={user.role === "user"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
         />
         <label className="form-check-label" htmlFor="role-user">
          User
         </label>
        </div>
        <div className="form-check">
         <input
          className="form-check-input"
          type="radio"
          name="role"
          value="admin"
          id="role-admin"
          checked={user.role === "admin"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
         />
         <label className="form-check-label" htmlFor="role-admin">
          Admin
         </label>
        </div>
       </div>

       <button type="submit" className="btn btn-success w-100 mt-3">
        Sign Up
       </button>
       <p className="pt-2 text-center">
        Already have an account?{" "}
        <Link className="text-primary text-decoration-underline" to="/login">
         Login
        </Link>
       </p>
      </form>
     </div>
    </div>
   </div>
  </div>
 );
}
