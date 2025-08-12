import { Link } from "react-router";
import Button from "../Utilities/Btn";

const FridgeCard = ({ foodData }) => {
  const { title, category, quantity, expiryDate, image, _id } = foodData;

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
    <div className="flex justify-center">
      <div
        className="flex flex-col bg-white rounded-xl shadow-lg
          w-80 h-[430px] overflow-hidden
          ring-1 ring-gray-200
          transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl"
      >
        {/* Image container */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
          />

          {/* Badge */}
          {(isExpired || isNearlyExpired) && (
            <div
              className={`absolute top-3 right-3 px-3 py-1 rounded-full font-semibold text-xs uppercase tracking-wide select-none
                ${
                  isExpired
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-yellow-400 text-black shadow-lg"
                }
                animate-pulse`}
              title={isExpired ? "This item has expired" : "This item will expire soon"}
            >
              {isExpired ? "Expired" : "Nearly Expired"}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Title */}
          <h3
            className="text-xl font-semibold text-gray-900 mb-3 leading-snug line-clamp-2"
            title={title}
          >
            {title}
          </h3>

          {/* Info section */}
          <div className="flex justify-between text-gray-700 text-sm mb-6">
            <div className="space-y-1">
              <p>
                <span className="font-medium text-gray-900">Category:</span> {category}
              </p>
              <p>
                <span className="font-medium text-gray-900">Quantity:</span> {quantity}
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="font-medium text-gray-900">Expires:</p>
              <p>{formattedExpiryDate}</p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto flex justify-center">
            <Link to={`/food-details/${_id}`}>
              <Button name="See Details" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FridgeCard;
