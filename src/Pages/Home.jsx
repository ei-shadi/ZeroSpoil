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
      <section className="mb-28 md:mb-36">
        <Slider />
      </section>

      {/* Upcoming Expiry Food Card Section */}
      <section className="mb-28 md:mb-36">
        <FoodCard />
      </section>

      {/* Expired Food Section */}
      <section className="mb-28 md:mb-36">
        <ExpiredFood />
      </section>

      {/* Donate Food Section */}
      <section className=" mb-28 md:mb-36">
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
      <section className="mb-28 md:mb-36">
        <FoodWasteInsights />
      </section>

      {/* Tips For Foods Section */}
      <section className="w-11/12 lg:w-7/12 mx-auto mb-28 md:mb-36">
        <FreshFoodTips />
      </section>

      {/* Client Review */}
      <div className="mb-18 md:mb-28">
        <ClientReview />
      </div>
    </>
  );
};

export default Home;
