import { Component } from "react";
import { Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight, Play, StopCircle } from "lucide-react";
class Slider extends Component {
 constructor(props) {
  super(props);
  this.state = {
   currentIndex: 0,
   isPlaying: false,
  };
  this.images = ["/cover-1.png", "/cover-2.png", "/cover-3.png"];
  this.autoplayInterval = null;
 }

 nextSlide = () => {
  this.setState((prevState) => ({
   currentIndex:
    prevState.currentIndex + 1 === this.images.length
     ? 0
     : prevState.currentIndex + 1,
  }));
 };

 prevSlide = () => {
  this.setState((prevState) => ({
   currentIndex:
    (prevState.currentIndex - 1 + this.images.length) % this.images.length,
  }));
 };

 startAutoplay = () => {
  if (!this.state.isPlaying) {
   this.setState({ isPlaying: true });
   this.autoplayInterval = setInterval(this.nextSlide, 4000);
  }
 };

 stopAutoplay = () => {
  this.setState({ isPlaying: false });
  clearInterval(this.autoplayInterval);
 };

 componentDidMount() {
  this.startAutoplay();
 }

 render() {
  const { currentIndex } = this.state;
  return (
   <div style={{ textAlign: "center" }}>
    <div className="position-relative mb-5">
     <img
      src={this.images[currentIndex]}
      style={{
       width: "100%",
       height: "100%",
       objectFit: "cover",
       transition: "all 1s",
      }}
      className="rounded"
     />

     <Button
      onClick={this.nextSlide}
      className="position-absolute top-50 bg-white text-black border-0"
      style={{ right: "3rem", opacity: ".5" }}
     >
      <ChevronRight />
     </Button>
     <Button
      onClick={this.prevSlide}
      className="position-absolute top-50 bg-white text-black border-0"
      style={{ left: "3rem", opacity: ".5" }}
     >
      <ChevronLeft />
     </Button>
    </div>
    {/* <div className="mt-4 gap-3 d-flex justify-content-center">
     <Button onClick={this.startAutoplay}>
      <Play />
     </Button>
     <Button onClick={this.stopAutoplay}>
      <StopCircle />
     </Button>
    </div> */}
   </div>
  );
 }
}

export default Slider;
