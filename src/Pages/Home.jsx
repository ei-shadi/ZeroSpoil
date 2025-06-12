import { Helmet } from "react-helmet-async";
import Slider from "../Components/Home/Slider";
import Card from "../Components/Home/FoodCard";



const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - ZeroSpoil</title>
      </Helmet>
      {/* Slider Section */}
      <section>
      <Slider />
      </section>
      {/* Card Section */}
      <section>
        <Card />
      </section>
    </>
  );
};

export default Home;