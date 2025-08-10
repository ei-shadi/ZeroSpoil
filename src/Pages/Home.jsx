import { Helmet } from "react-helmet-async";
import Slider from "../Components/Home/Slider";
import FoodCard from "../Components/Home/FoodCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ExpiredFood from "../Components/Home/ExpiredFood";
import FreshFoodTips from "../Components/Home/FreeshFoodTips";
import DonateFoodSection from "../Components/Home/DonateFood";

const Home = () => {
  const [expiredFoodsData, setExpiredFoodsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const expiredFoodsResponse = await axios(`${import.meta.env.VITE_API_URL}/expired-foods`);
        const expiredFoodsData = await expiredFoodsResponse.data;
        setExpiredFoodsData(expiredFoodsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - ZeroSpoil</title>
      </Helmet>

      {/* Slider Section */}
      <section className="mb-32">
        <Slider />
      </section>

      {/* Upcoming Expiry Food Card Section */}
      <section className="w-10/12 lg:w-9/12 mx-auto mb-32">
        <h1 className="text-5xl md:text-6xl text-center mb-10 md:mb-14">
          Upcoming Expiry Food
        </h1>
        {/* FoodCard  */}
        <FoodCard />
      </section>

      {/* Already Expired Food Card Section */}
      <section className="w-10/12 lg:w-9/12 mx-auto mb-32">
        <h1 className="text-5xl md:text-6xl text-center mb-10 md:mb-14">
          Expired Food
        </h1>
        {/* ExpiredFood Card*/}
        <ExpiredFood />
      </section>

      {/* Donate Food Section */}
      <section className="mb-32">
        <h1 className="text-5xl md:text-6xl text-center mb-10 md:mb-14">
          Donate Food
        </h1>
        <DonateFoodSection />
      </section>

      {/* Tips For Foods Section */}
      <section className="w-11/12 lg:w-7/12 mx-auto mb-32">
        <FreshFoodTips expiredFoodsData={expiredFoodsData} />
      </section>
    </>
  );
};

export default Home;
