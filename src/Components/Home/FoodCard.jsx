import React from "react"; 
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import FoodItemCard from "../../Shared/FoodItemCard";
import SkeletonCard from "../../Shared/SkeletonCard"; 

const fetchUpcomingFoods = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/upcoming-expire-foods`);
  return response.data;
};

const FoodCard = React.memo(() => {
  const { data: foodsData = [], isLoading, isError } = useQuery({
    queryKey: ["upcomingExpireFoods"],
    queryFn: fetchUpcomingFoods,
  });

  if (isError)
    return <p className="text-center text-red-600 py-10">Error: Failed to fetch foods</p>;

  return (
    <section className="px-4 mx-auto sm:max-w-xl md:max-w-7xl lg:max-w-screen-xl md:px-10 lg:px-8">
      {/* Title & Description */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold max-w-xl lg:max-w-3xl mx-auto leading-">
          <span className="text-[#a05cff] italic">Upcoming</span> Expiry Food
          <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
        </h1>
        <p className="text-lg md:text-xl des-color mt-3 font-semibold opacity-70 max-w-4xl mx-auto">
          A list of food items that are approaching their expiration dates.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
          : foodsData.map(food => (
              <FoodItemCard
                key={food._id}
                {...food}
                link={`/food-details/${food._id}`}
                badge={{ text: "Nearly Expired", color: "bg-yellow-400 text-black" }}
              />
            ))}
      </div>
    </section>
  );
});

export default FoodCard;
