import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Utilities/Loader";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Link } from "react-router";
import Button from "../../Utilities/Btn";

const fetchExpiredFoods = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/expired-foods`
  );
  return response.data;
};

const ExpiredFood = () => {
  const { data: expiredFoodsData = [], isLoading, isError } = useQuery({
    queryKey: ["expiredFoods"],
    queryFn: fetchExpiredFoods,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-600 py-10">
        Error: Failed to fetch expired foods
      </p>
    );

  return (
    <section className="px-4 mx-auto sm:max-w-xl md:max-w-7xl lg:max-w-screen-xl md:px-10 lg:px-8">
      {/* Title & Description */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl leading-tight md:leading-snug font-bold max-w-xl lg:max-w-4xl mx-auto">
          <span className="text-[#a05cff] italic">Expired</span> Food
          <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
        </h1>
        <p className="text-lg md:text-xl text-center des-color mx-auto mt-2 md:mt-6 max-w-4xl mb-10 md:mb-14 font-semibold opacity-70">
          Food items that have passed their expiration date and should be discarded to ensure safety and freshness.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {expiredFoodsData.map(
          ({ _id, title, category, quantity, expiryDate, image }) => {
            const expiry = new Date(expiryDate);
            const today = new Date();
            const nearlyExpiryThreshold = new Date();
            nearlyExpiryThreshold.setDate(today.getDate() + 6);

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
                className="flex flex-col bg-white rounded-xl shadow-lg w-full max-w-xs overflow-hidden mx-auto ring-1 ring-gray-200 transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl group"
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
                        ${isExpired
                          ? "bg-red-600 text-white shadow-lg animate-pulse"
                          : "bg-yellow-400 text-black shadow-lg animate-pulse"
                        }`}
                      title={isExpired ? "This item has expired" : "This item will expire soon"}
                    >
                      {isExpired ? "Expired" : "Nearly Expired"}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 px-4 py-5 text-gray-900">
                  {/* Title */}
                  <h3
                    className="text-2xl font-extrabold mb-4 leading-snug line-clamp-2 text-center border-4 border-cyan-500 rounded-full bg-yellow-100 text-black py-1"
                    title={title}
                  >
                    {title}
                  </h3>

                  {/* Info Section */}
                  <div className="flex justify-between text-gray-700 text-sm mb-6">
                    <div className="space-y-1">
                      <p className="font-semibold text-base">
                        Category: <span className="text-green-600">{category}</span>
                      </p>
                      <p className="font-semibold text-base">
                        Quantity: <span className="text-green-600">{quantity}</span>
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-base">Expires:</p>
                      <p className="font-semibold text-red-600 text-base">{formattedExpiryDate}</p>
                    </div>
                  </div>

                   {/* Button */}
                  <div className="mt-auto flex justify-center">
                    <Link to={`/food-details/${_id}`}>
                      <Button name="Expired" />
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

export default ExpiredFood;
