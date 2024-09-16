import { Component } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default class Products extends Component {
 constructor(props) {
  super(props);
  this.state = {
   products: [],
   currentPage: 1,
  };
 }

 nextPage = () => {
  if (this.state.currentPage === this.state.products.length / 10) {
   this.setState({ currentPage: 1 });
  } else {
   this.setState({ currentPage: this.state.currentPage + 1 });
  }
 };
 prevPage = () => {
  this.setState({ currentPage: this.state.currentPage - 1 });
 };
 //  isNext = () => {
 //   return this.state.currentPage < this.state.products.length / 10 ? true : false;
 //  };
 isPrev = () => {
  return this.state.currentPage > 1;
 };

 componentDidMount() {
  // throw new Error("Failed to fetch products");
  (async () => {
   try {
    const res = await axios.get("https://dummyjson.com/products");
    this.setState({ products: res.data.products });
    // console.log(res.data.products);
   } catch (error) {
    throw new Error("Failed to fetch products", error);
   }
  })();
 }

 render() {
  const products = this.state.products.slice(
   this.state.currentPage * 10 - 10,
   this.state.currentPage * 10
  );
  // console.log(this.state.currentPage);
  return (
   <div>
    <h1 className="text-center">products</h1>
    <div>
     {products.map((product) => (
      <Product key={product.id} product={product} />
     ))}
    </div>
    <div className="d-flex gap-2">
     <Button disabled={!this.isPrev()} onClick={this.prevPage}>
      <ChevronLeft />
     </Button>
     <Button>{this.state.currentPage}</Button>
     <Button onClick={this.nextPage}>
      <ChevronRight />
     </Button>
    </div>
   </div>
  );
 }
}
