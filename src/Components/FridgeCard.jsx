import { Link } from 'react-router';
import Button from '../Utilities/Btn';

const FridgeCard = ({ foodData }) => {
  const { title, category, quantity, expiryDate, image, _id } = foodData;

  // Convert expiryDate string to Date object for comparison
  const expiry = new Date(expiryDate);
  const today = new Date();
  // Date 5 days from now
  const nearlyExpiryThreshold = new Date();
  nearlyExpiryThreshold.setDate(today.getDate() + 5);

  // Format expiry date nicely (e.g., "Jun 17, 2025")
  const formattedExpiryDate = expiry.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Check if expired or nearly expired
  const isExpired = expiry < today;
  const isNearlyExpired = !isExpired && expiry <= nearlyExpiryThreshold;

  return (
    <div className="flex justify-center p-4">
      <div className="w-80 p-5 bg-white/10 backdrop-blur-md border border-white/80 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 bg-gradient-to-t from-[#009CB3] to-black transition duration-300 text-white hover:from-black hover:to-[#009CB3] relative">

        <img
          src={image}
          alt={title}
          className="w-full h-44 object-cover rounded-md mb-4 border border-transparent hover:border-red-500 transition"
        />

        {/* Badge container */}
        {(isExpired || isNearlyExpired) && (
          <div
            className={`absolute top-3 right-3 px-4 py-1 rounded-full font-semibold text-sm
              ${isExpired ? "bg-red-600 text-white" : "bg-yellow-400 text-black"}
              hover:cursor-pointer
              hover:brightness-110
              hover:scale-110
              hover:shadow-lg
              transition-transform transition-filter duration-300`}
            title={isExpired ? "This item has expired" : "This item will expire soon"}
          >
            {isExpired ? "Expired" : "Nearly Expired"}
          </div>
        )}

        <div className="text-left">
          <h3 className="text-3xl text-center font-semibold my-5 bg-gradient-to-r from-[#00D3F2] to-white bg-clip-text text-transparent">
            {title}
          </h3>

          <p className="text-lg font-semibold text-[#e07a5f] mb-1 pt-2 border-t-2">
            <span className="text-white">Category : </span>{category}
          </p>
          <p className="text-lg font-semibold text-[#e07a5f] mb-1">
            <span className="text-white">Quantity : </span>{quantity}
          </p>

          <div className="border-b-2 border-[#e07a5f] pb-2">
            <p className="text-lg font-semibold text-[#e07a5f]">
              <span className="text-white">Expires : </span>{formattedExpiryDate}
            </p>
          </div>

          <div className="flex justify-center mt-6">
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
