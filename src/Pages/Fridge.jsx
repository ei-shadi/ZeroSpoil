import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import FridgeCard from "../Components/FridgeCard";
import Loader from "../Utilities/Loader";
import axios from "axios";

const Fridge = () => {
  const [foodsData, setFoodsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodsData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/foods-data`);
        setFoodsData(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodsData();
  }, []);

  if (loading) return <Loader />;

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="lg:w-9/12 mx-auto">
      <Helmet>
        <title>Fridge - ZeroSpoil</title>
      </Helmet>
      <h1 className="text-4xl w-3/4 mx-auto md:text-5xl text-center mb-10 md:mb-14 mt-20">All Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {foodsData && foodsData.map(foodData => (
          <FridgeCard key={foodData._id} foodData={foodData} />
        ))}
      </div>
    </section>
  );
};

export default Fridge;
