import { Helmet } from "react-helmet-async";
import Slider from "../Components/Home/Slider";
import FoodCard from "../Components/Home/FoodCard";
import ExpiredFood from "../Components/Home/ExpiredFood";
import FreshFoodTips from "../Components/Home/FreshFoodTips";
import DonateFoodSection from "../Components/Home/DonateFood";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import ClientReview from "../Components/Home/ClientReview";
import FoodWasteInsights from "../Components/Home/FoodWasteInsights";

const Home = () => {

  return (
    <>
      <Helmet>
        <title>Home - ZeroSpoil</title>
      </Helmet>

      {/* Slider Section */}
      <section className="mb-20 md:mb-32">
        <Slider />
      </section>

      {/* Upcoming Expiry Food Card Section */}
      <section className="mb-20 md:mb-32">
        <FoodCard />
      </section>

      {/* Expired Food Section */}
      <section className="mb-20 md:mb-32">
        <ExpiredFood />
      </section>

      {/* Donate Food Section */}
      <section className="mb-20 md:mb-32">
        <div>
          <h1 className="text-4xl md:text-6xl text-center leading-11 md:leading-18 lg:leading-0">
            <span className="text-[#a05cff] italic pr-1">Donate</span> Food
            <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
          </h1>
          <p className="text-lg md:text-xl text-center des-color mx-auto mt-2 md:mt-6 max-w-4xl px-7 mb-10 md:mb-14 font-semibold opacity-70">Contribute surplus food to help those in need and reduce food waste by donating safely and responsibly.</p>
        </div>
        {/* DonateFood Section */}
        <DonateFoodSection />
      </section>

      {/* Food Waste Insights */}
      <section className="mb-20 md:mb-32">
        <FoodWasteInsights />
      </section>

      {/* Tips For Foods Section */}
      <section className="px-4 mx-auto sm:max-w-xl md:max-w-7xl lg:max-w-screen-xl md:px-10 lg:px-8 mb-20 md:mb-32">
        <FreshFoodTips />
      </section>

      {/* Client Review */}
      <div className="mb-20 md:mb-32">
        <ClientReview />
      </div>
    </>
  );
};

export default Home;
