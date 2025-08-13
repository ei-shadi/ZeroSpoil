import { Link } from "react-router";
import Button from "../Utilities/Btn";

const FridgeCard = ({ foodData }) => {
  const { title, category, quantity, expiryDate, image, _id } = foodData;

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
      className="flex flex-col bg-white rounded-xl shadow-lg w-full max-w-xs overflow-hidden mx-auto
      ring-1 ring-gray-200 transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl group"
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
        <h3
          className="text-2xl font-extrabold mb-4 leading-snug line-clamp-2 text-center border-4 border-cyan-500 rounded-full bg-yellow-100 text-black py-1 "
          title={title}
        >
          {title}
        </h3>

        <div className="flex justify-between text-gray-700 text-sm mb-6">
          <div className="space-y-1">
            <p className="font-semibold text-base">
              Category:{' '}<span className="text-green-600">{category}</span>
            </p>
            <p className="font-semibold text-base">
              Quantity:{' '}<span className="text-green-600">{quantity}</span> 
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="font-semibold text- text-base">Expires:</p>
            <p className="font-semibold text-red-600 text-base">{formattedExpiryDate}</p>
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
};

export default FridgeCard;
