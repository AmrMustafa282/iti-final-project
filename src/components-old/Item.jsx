import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export function Item({ item }) {
 return (
  <Card style={{ width: "18rem" }} className="text-start  ">
   <Card.Img variant="top" src={item.images[0]} />
   <Card.Body>
    <Card.Title>{item.title}</Card.Title>
    <div className="d-flex gap-2 align-items-center mb-2 ">
     {item.tags.map((tag) => (
      <Badge bg="secondary">{tag}</Badge>
     ))}
    </div>
    {/* <Card.Text>{item.description}</Card.Text> */}
    <p>${item.price}</p>
    <Button variant="primary">Buy</Button>
    {/* <Card.Text>${item.price}</Card.Text> */}
   </Card.Body>
  </Card>
 );
}
