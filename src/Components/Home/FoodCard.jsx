import { Link } from 'react-router';
import Button from '../../Utilities/Btn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../Utilities/Loader';

const FoodCard = () => {
  const [foodsData, setFoodsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_URL}/upcoming-expire-foods`);
        setFoodsData(response.data);
      } catch (err) {
        setError('Failed to fetch foods');
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <Loader/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {foodsData.map(({ _id, title, category, quantity, expiryDate, image }) => (
        <div
          key={_id}
          className="px-5 bg-white/10 backdrop-blur-md border border-white/80 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 bg-gradient-to-t from-[#009CB3] to-black transition duration-300 text-white hover:from-black hover:to-[#009CB3]"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-44 border-red-500 object-cover rounded-md mt-5"
          />
          <div className="text-left">
            <h3 className="text-3xl text-center font-extrabold my-4 bg-white text-black w-fit mx-auto px-10 py-2 rounded-full">
              {title}
            </h3>

            <p className="text-lg font-semibold text-[#e07a5f] mb-1 pt-2 border-t-2">
              <span className="text-white">Category : </span>
              {category}
            </p>
            <p className="text-lg font-semibold text-[#e07a5f] mb-1">
              <span className="text-white">Quantity : </span>
              {quantity}
            </p>
            <p className="text-lg font-semibold text-[#e07a5f] mb-1 pb-2 border-b-2">
              <span className="text-white">Expires : </span>
              {expiryDate}
            </p>

            <div className="flex justify-center my-4">
              <Link to={`/food-details/${_id}`}>
                <Button name="See Details" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
