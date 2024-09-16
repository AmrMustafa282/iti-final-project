import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const names = [
 "Dax",
 "Anthony Shew",
 "John Doe",
 "Jane Smith",
 "Alice Johnson",
 "Bob Brown",
 "Charlie Davis",
 "Diana Evans",
 "Edward Fox",
 "Fiona Green",
 "George Harris",
 "Hannah Ives",
];

const usernames = [
 "@thdxr",
 "@anthonysheww",
 "@johndoe",
 "@janesmith",
 "@alicejohnson",
 "@bobbrown",
 "@charliedavis",
 "@dianaevans",
 "@edwardfox",
 "@fionagreen",
 "@georgeharris",
 "@hannahives",
];

const texts = [
 "I’ve never felt more confident and radiant since using this product. It’s truly transformative!",
 "This is by far the best beauty product I’ve ever tried. It’s a game-changer for my skincare routine.",
 "The results are amazing! My skin feels smoother and looks healthier. Highly recommend this product!",
 "I’m in love with this beauty product. It’s made such a difference in my daily routine.",
 "This is the holy grail of skincare! My skin has never looked better. Thank you for this amazing product.",
 "My beauty routine has been elevated thanks to this product. It’s worth every penny!",
 "Incredible results! My friends have already asked me for the secret to my glowing skin.",
 "I’ve tried many products, but this one stands out. It’s effective and easy to use.",
 "I can’t imagine my routine without this product. It’s become a staple in my skincare regimen.",
 "The quality of this product is exceptional. My skin feels nourished and rejuvenated.",
 "A must-have for anyone serious about their skincare. This product delivers on all its promises!",
 "I’m amazed at how quickly I saw results. This product has exceeded my expectations!",
];

const links = [
 "https://x.com/thdxr/status/1719129834901721353?s=20",
 "https://x.com/anthonysheww/status/1688973391917969408?s=20",
 "https://x.com/johndoe/status/1234567890?s=20",
 "https://x.com/janesmith/status/0987654321?s=20",
 "https://x.com/alicejohnson/status/2345678901?s=20",
 "https://x.com/bobbrown/status/3456789012?s=20",
 "https://x.com/charliedavis/status/4567890123?s=20",
 "https://x.com/dianaevans/status/5678901234?s=20",
 "https://x.com/edwardfox/status/6789012345?s=20",
 "https://x.com/fionagreen/status/7890123456?s=20",
 "https://x.com/georgeharris/status/8901234567?s=20",
 "https://x.com/hannahives/status/9012345678?s=20",
];

const getRandomImage = () => {
 const width = 50;
 const height = 50;
 return `https://picsum.photos/${width}/${height}?random=${Math.floor(
  Math.random() * 1000
 )}`;
};

const generateTestimonials = () => {
 const testimonials = [];
 for (let i = 0; i < 6; i++) {
  testimonials.push({
   avatar: getRandomImage(),
   name: names[i],
   username: usernames[i],
   text: texts[i % texts.length],
   link: links[i % links.length],
  });
 }
 return testimonials;
};

const TwitterFeed = () => {
 const testimonials = generateTestimonials();

 return (
  <Container>
   <Row>
    {testimonials.map((tweet, index) => (
     <Col key={index} md={4} className="mb-3 rounded bg-light">
      <Card>
       <Card.Body>
        <Card.Title className="d-flex align-items-center">
         <img
          src={tweet.avatar}
          alt={tweet.username}
          className="rounded-circle me-2"
          style={{ width: 40, height: 40 }}
         />
         <div>
          <strong>{tweet.name}</strong>
          <br />
          <small>{tweet.username}</small>
         </div>
        </Card.Title>
        <Card.Text>{tweet.text}</Card.Text>
       </Card.Body>
      </Card>
     </Col>
    ))}
   </Row>
  </Container>
 );
};

export default TwitterFeed;
