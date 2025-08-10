import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import FridgeCard from "../Components/FridgeCard";
import Loader from "../Utilities/Loader";
import axios from "axios";
import CountUp from "react-countup";

const Fridge = () => {
  const [foodsData, setFoodsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");     // Controlled input value
  const [searchQuery, setSearchQuery] = useState("");   // Actual search trigger value
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch data when searchQuery or selectedCategory changes
  useEffect(() => {
    const fetchFoodsData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (selectedCategory) params.append("category", selectedCategory);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/foods-data/search?${params.toString()}`
        );
        setFoodsData(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodsData();
  }, [searchQuery, selectedCategory]);

  // Handle Enter key press in the search input
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchQuery(searchTerm.trim());
    }
  };

  // Calculate counts for expired and nearly expired foods
  const today = new Date();
  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(today.getDate() + 5);

  let expiredCount = 0;
  let nearlyExpiredCount = 0;

  if (foodsData && Array.isArray(foodsData)) {
    foodsData.forEach((food) => {
      // Assuming food.expiryDate exists and is a valid date string or Date object
      const expiryDate = new Date(food.expiryDate);

      if (expiryDate < today) {
        expiredCount++;
      } else if (expiryDate >= today && expiryDate <= fiveDaysFromNow) {
        nearlyExpiredCount++;
      }
    });
  }

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="lg:w-9/12 mx-auto px-4 pt-24">
      <Helmet>
        <title>Fridge - ZeroSpoil</title>
      </Helmet>

      <h1 className="text-4xl w-3/4 mx-auto md:text-5xl text-center mb-10 md:mb-14 mt-20">
        All Items
      </h1>

      {/* CountUp display for expired and nearly expired */}
      <div className="flex justify-center gap-10 mb-8">
        <div className="bg-red-100 text-red-700 px-6 py-3 rounded shadow text-center">
          <p className="font-semibold text-lg">Expired Items</p>
          <CountUp
            start={0}
            end={expiredCount}
            duration={1.5}
            separator=","
            className="text-3xl font-bold"
          />
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded shadow text-center">
          <p className="font-semibold text-lg">Nearly Expired Items</p>
          <CountUp
            start={0}
            end={nearlyExpiredCount}
            duration={1.5}
            separator=","
            className="text-3xl font-bold"
          />
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="border rounded px-4 py-2 w-full md:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border  rounded px-4 py-2 w-full md:w-1/3"
        >
          <option value="" className="bg-gray-500">All Categories</option>
          <option value="Dairy" className="bg-amber-500">Dairy</option>
          <option className="bg-amber-500" value="Meat">Meat</option>
          <option className="bg-amber-500" value="Vegetable">Vegetables</option>
          <option className="bg-amber-500" value="Bakery">Bakery</option>
          <option className="bg-amber-500" value="Fruit">Fruits</option>
          <option className="bg-amber-500" value="Beverage">Beverages</option>
          <option className="bg-amber-500" value="Grains">Grains</option>
          <option className="bg-amber-500" value="Poultry">Poultry</option>
          <option className="bg-amber-500" value="Seafood">Seafood</option>
        </select>
      </div>

      {/* Grid of Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {foodsData &&
          foodsData.map((foodData) => (
            <FridgeCard key={foodData._id} foodData={foodData} />
          ))}
      </div>
    </section>
  );
};

export default Fridge;
