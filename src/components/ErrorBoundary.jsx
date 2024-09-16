import { Component } from "react";

class ErrorBoundary extends Component {
 constructor(props) {
  super(props);
  this.state = { hasError: false };
 }

 static getDerivedStateFromError() {
  return { hasError: true };
 }

 render() {
  if (this.state.hasError) {
   return (
    <div
     className="container mt-5 d-flex justify-content-center flex-column align-items-center gap-4"
     style={{ height: "100vh" }}
    >
     <div className="alert alert-warning">Something went wrong.</div>
     <button
      className="btn btn-primary "
      onClick={() => {
       window.location.reload();
      }}
     >
      refresh
     </button>
    </div>
   );
  }

  return this.props.children;
 }
}

export default ErrorBoundary;
