import Spinner from "react-bootstrap/Spinner";

export function LoadingSpinner() {
 return (
  <div className="spinner">
   <Spinner animation="border" role="status"></Spinner>
  </div>
 );
}
