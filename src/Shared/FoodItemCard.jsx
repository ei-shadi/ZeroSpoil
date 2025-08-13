import React from "react";
import { Link } from "react-router";
import Button from "../Shared/Btn";

const FoodItemCard = React.memo(({ title, category, quantity, expiryDate, image, link, badge }) => {
  const expiry = new Date(expiryDate);
  const formattedExpiryDate = expiry.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="flex flex-col bg-white rounded-xl shadow-md w-full max-w-xs overflow-hidden mx-auto ring-1 ring-gray-200 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {badge && (
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full font-semibold text-xs uppercase tracking-wide select-none
                        ${badge.color} shadow-sm transition-all duration-300`}
            title={badge.text}
          >
            {badge.text}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 px-4 py-5 text-gray-900">
        <h3
          className="text-2xl font-bold mb-3 leading-snug line-clamp-2 text-center border-2 border-cyan-500 rounded-full bg-yellow-100 text-black py-1"
          title={title}
        >
          {title}
        </h3>

        <div className="flex justify-between text-gray-700 text-sm mb-5">
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

        <div className="mt-auto flex justify-center">
          <Link to={link}>
            <Button name="See Details" />
          </Link>
        </div>
      </div>
    </div>
  );
});

export default FoodItemCard;
