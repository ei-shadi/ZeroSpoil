import { Helmet } from "react-helmet-async";
import Slider from "../Components/Home/Slider";
import FoodCard from "../Components/Home/FoodCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ExpiredFood from "../Components/Home/ExpiredFood";
import FreshFoodTips from "../Components/Home/FreeshFoodTips";
import DonateFoodSection from "../Components/Home/DonateFood";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

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
        <h1 className="text-4xl md:text-6xl text-center leading-11 md:leading-18 lg:leading-0">
          <span className="text-[#a05cff] italic">Upcoming</span> Expiry Food
          <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
        </h1>
        <p className="text-lg md:text-xl text-center des-color mx-auto mt-2 md:mt-6 max-w-4xl mb-10 md:mb-14 font-semibold opacity-70">A list of food items that are approaching their expiration dates. Keep an eye on these to ensure you use them in time and reduce food waste.</p>
        
        {/* FoodCard  */}
        <FoodCard />
      </section>

      {/* Already Expired Food Card Section */}
      <section className="w-10/12 lg:w-9/12 mx-auto mb-32">
        <h1 className="text-4xl md:text-6xl text-center leading-11 md:leading-18 lg:leading-0">
          <span className="text-[#a05cff] italic pr-1">Expired</span> Food
          <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
        </h1>
        <p className="text-lg md:text-xl text-center des-color mx-auto mt-2 md:mt-6 max-w-4xl mb-10 md:mb-14 font-semibold opacity-70 ">Food items that have passed their expiration date and should be discarded to ensure safety and freshness.</p>

        {/* ExpiredFood Card*/}
        <ExpiredFood />
      </section>

      {/* Donate Food Section */}
      <section className="mb-32">
        <h1 className="text-4xl md:text-6xl text-center leading-11 md:leading-18 lg:leading-0">
          <span className="text-[#a05cff] italic pr-1">Donate</span> Food
          <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
        </h1>
        <p className="text-lg md:text-xl text-center des-color mx-auto mt-2 md:mt-6 max-w-4xl px-7 mb-10 md:mb-14 font-semibold opacity-70">Contribute surplus food to help those in need and reduce food waste by donating safely and responsibly.</p>

        {/* DonateFood Section */}
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
