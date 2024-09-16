import "bootstrap/dist/css/bootstrap.min.css";

const brandImages = [
 "/brand-1.png",
 "/brand-2.png",
 "/brand-3.png",
 "/brand-4.jpg",
 "/brand-5.svg",
 "/brand-6.png",
];

export default function Banner() {
 return (
  <div className="container mt-4">
   <div className="row">
    {brandImages.map((image, index) => (
     <div className="col-6 col-md-4 col-lg-2 mb-4" key={index}>
      <img
       src={image}
       alt={`Brand ${index + 1}`}
       className="img-fluid"
       style={{ maxHeight: "100px", objectFit: "contain" }}
      />
     </div>
    ))}
   </div>
  </div>
 );
}
