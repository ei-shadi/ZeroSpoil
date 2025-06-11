import { Helmet } from "react-helmet-async";
import Slider from "../Components/Home/Slider";

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
    </>
  );
};

export default Home;