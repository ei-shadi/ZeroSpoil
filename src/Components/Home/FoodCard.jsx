import { Link } from "react-router";
import Button from "../../Utilities/Btn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Utilities/Loader";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const fetchFoods = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/upcoming-expire-foods`
  );
  return response.data;
};

const FoodCard = () => {
  const {
    data: foodsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["upcomingExpireFoods"],
    queryFn: fetchFoods,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-600 mt-10">
        Error: Failed to fetch foods
      </p>
    );

  return (
    <section className="px-4 mx-auto sm:max-w-xl md:max-w-7xl lg:max-w-screen-xl md:px-10 lg:px-8 my-16">
      {/* Title & Description */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl leading-tight md:leading-snug font-bold max-w-xl lg:max-w-4xl mx-auto">
          <span className="text-[#a05cff] italic">Upcoming</span> Expiry Food
          <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
        </h1>
        <p className="text-lg md:text-xl text-center des-color mx-auto mt-2 md:mt-6 max-w-4xl mb-10 md:mb-14 font-semibold opacity-70">
          A list of food items that are approaching their expiration dates. Keep an
          eye on these to ensure you use them in time and reduce food waste.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {foodsData.map(
          ({ _id, title, category, quantity, expiryDate, image }) => {
            const expiry = new Date(expiryDate);
            const today = new Date();
            const nearlyExpiryThreshold = new Date();
            nearlyExpiryThreshold.setDate(today.getDate() + 5);

            const formattedExpiryDate = expiry.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            const isExpired = expiry < today;
            const isNearlyExpired = !isExpired && expiry <= nearlyExpiryThreshold;

            return (
              <div
                key={_id}
                className="flex flex-col bg-white rounded-xl shadow-lg w-full max-w-xs overflow-hidden ring-1 ring-gray-200
                  transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />

                  {(isExpired || isNearlyExpired) && (
                    <div
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full font-semibold text-xs uppercase tracking-wide select-none
                        ${
                          isExpired
                            ? "bg-red-600 text-white shadow-lg animate-pulse"
                            : "bg-yellow-400 text-black shadow-lg animate-pulse"
                        }`}
                      title={
                        isExpired
                          ? "This item has expired"
                          : "This item will expire soon"
                      }
                    >
                      {isExpired ? "Expired" : "Nearly Expired"}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 px-6 py-5 text-gray-900">
                  <h3
                    className="text-2xl font-extrabold mb-3 leading-snug line-clamp-2 text-center"
                    title={title}
                  >
                    {title}
                  </h3>

                  <div className="flex justify-between text-gray-700 text-sm mb-6">
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium text-gray-900">
                          Category:
                        </span>{" "}
                        {category}
                      </p>
                      <p>
                        <span className="font-medium text-gray-900">
                          Quantity:
                        </span>{" "}
                        {quantity}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium text-gray-900">Expires:</p>
                      <p>{formattedExpiryDate}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-center">
                    <Link to={`/food-details/${_id}`}>
                      <Button name="See Details" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default FoodCard;
