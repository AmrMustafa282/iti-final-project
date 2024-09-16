import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

export default function Layout() {
 return (
  <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
   <Header />
   <div className="flex-grow-1 container mx-auto d-flex justify-content-center mb-5 ">
    <Outlet />
   </div>
   <Footer />
   <Toaster position="top-center" reverseOrder={false} />
  </div>
 );
}
