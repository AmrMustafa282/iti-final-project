import ItemsList from "./../components/ItemsList";
import Slider from "../components/Slider";
import Testimonials from "../components/Testimonials";
import Banner from "../components/Banner";

export default function HomePage() {
 return (
  <div>
   <Slider />
   <div className="">
    <ItemsList />
   </div>
   <section style={{ marginTop: "200px " }}>
    <Banner />
   </section>
   <section className=" my-4">
    <Testimonials />
   </section>
  </div>
 );
}
