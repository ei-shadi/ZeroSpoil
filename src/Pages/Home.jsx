import { Helmet } from "react-helmet-async";
import Slider from "../Components/Home/Slider";
import FoodCard from "../Components/Home/FoodCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ExpiredFood from "../Components/Home/ExpiredFood";
import FreshFoodTips from "../Components/Home/FreeshFoodTips";
import DonateFoodSection from "../Components/Home/DonateFood";



const Home = () => {
  const [foodsData, setFoodsData] = useState([]);
  const [expiredFoodsData, setExpiredFoodsData] = useState([]);


  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Get The Foods Data
        const foodsResponse = await axios(`${import.meta.env.VITE_API_URL}/upcoming-expire-foods`);
        const foodsData = await foodsResponse.data;
        setFoodsData(foodsData);

        // Get the Foods Data That Already Expired
        const expiredFoodsResponse = await axios(`${import.meta.env.VITE_API_URL}/expired-foods`);
        const expiredFoodsData = await expiredFoodsResponse.data;
        setExpiredFoodsData(expiredFoodsData);


      } catch (error) {
        console.error("Error fetching data:", error);

      }
    }

    fetchData();
  }, []);


  return (
    <>
      <Helmet>
        <title>Home - ZeroSpoil</title>
      </Helmet>

      {/* Slider Section */}
      <section className="mb-20">
        <Slider />
      </section>

      {/* Upcoming Expiry Food Card Section */}
      <section className="lg:w-7/12 mx-auto mb-20">
        <h1 className="text-4xl w-3/4 mx-auto md:text-5xl text-center mb-10 md:mb-14">Upcoming Expiry Food</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            foodsData.map((foodsData) => <FoodCard key={foodsData._id} foodsData={foodsData} />)
          }
        </div>
      </section>

      {/* Already Expired Food Card Section */}
      <section className="lg:w-7/12 mx-auto mb-20">
        <h1 className="text-4xl w-3/4 mx-auto md:text-5xl text-center mb-10 md:mb-14">Expired Food</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            expiredFoodsData.map((expiredFoodsData) => <ExpiredFood key={expiredFoodsData._id} expiredFoodsData={expiredFoodsData} />)
          }
        </div>
      </section>

      {/* Donate Food Section */}
      <section className="mx-auto mb-20">
        <h1 className="text-4xl w-3/4 mx-auto md:text-5xl text-center mb-10 md:mb-14">Donate Food</h1>
        <DonateFoodSection />
      </section>

      {/* Tips For Foods Section */}
      <section className="lg:w-7/12 mx-auto mb-20">
        <FreshFoodTips expiredFoodsData={expiredFoodsData}/>
      </section>

      
    </>

  );
};

export default Home;