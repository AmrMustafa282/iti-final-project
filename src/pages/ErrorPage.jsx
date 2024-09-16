import { Link } from "react-router-dom";

export default function ErrorPage() {
 return (
  <>
   <div className="alert alert-warning">
    Opps!! Something went wrong{" "}
    <Link to={"/home"} className="text-primary text-decoration-underline ">
     Try Again
    </Link>
   </div>
  </>
 );
}
