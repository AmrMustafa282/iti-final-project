import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Brush, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
 return (
  <footer className="bg-dark text-white py-4">
   <div className="container">
    <div className="row">
     <div className="col-md-3 mb-3">
      <h5 className="text-uppercase">About Us</h5>
      <p>
       Discover the latest trends in fashion and beauty with our curated
       collection. We are dedicated to bringing you the finest products and an
       unparalleled shopping experience.
      </p>
     </div>

     <div className="col-md-3 mb-3">
      <h5 className="text-uppercase">Quick Links</h5>
      <ul className="list-unstyled">
       <li>
        <Link to="/" className="text-white">
         Home
        </Link>
       </li>
       <li>
        <Link to="/shop" className="text-white">
         Shop
        </Link>
       </li>
       <li>
        <Link to="/about" className="text-white">
         About Us
        </Link>
       </li>
       <li>
        <Link to="/contact" className="text-white">
         Contact Us
        </Link>
       </li>
      </ul>
     </div>

     <div className="col-md-3 mb-3">
      <h5 className="text-uppercase">Contact Us</h5>
      <p>
       <strong>Email:</strong> info@fashionbeauty.com
       <br />
       <strong>Phone:</strong> +123 456 7890
      </p>
     </div>

     <div className="col-md-3 mb-3">
      <h5 className="text-uppercase">Follow Us</h5>
      <div className="d-flex">
       <a
        href="https://facebook.com"
        className="text-white me-3"
        target="_blank"
        rel="noopener noreferrer"
       >
        <Facebook />
       </a>
       <a
        href="https://instagram.com"
        className="text-white me-3"
        target="_blank"
        rel="noopener noreferrer"
       >
        <Instagram />
       </a>
       <a
        href="https://twitter.com"
        className="text-white me-3"
        target="_blank"
        rel="noopener noreferrer"
       >
        <Twitter />
       </a>
       <a
        href="https://pinterest.com"
        className="text-white"
        target="_blank"
        rel="noopener noreferrer"
       >
        <Brush />
       </a>
      </div>
     </div>
    </div>

    {/* Footer Bottom */}
    <div className="row mt-4">
     <div className="col text-center">
      <p className="mb-0">
       &copy; {new Date().getFullYear()} Fashion & Beauty. All rights reserved.
      </p>
     </div>
    </div>
   </div>
  </footer>
 );
}
