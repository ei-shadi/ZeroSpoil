import { Helmet } from "react-helmet-async";
import { useState } from "react";
import FridgeCard from "../Components/FridgeCard";
import Loader from "../Utilities/Loader";
import axios from "axios";
import CountUp from "react-countup";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";

const itemsPerPage = 8;

const fetchFoodsData = async ({ queryKey }) => {
  const [_key, { searchQuery, selectedCategory, currentPage }] = queryKey;
  const params = new URLSearchParams();

  if (searchQuery) params.append("search", searchQuery);
  if (selectedCategory) params.append("category", selectedCategory);
  params.append("page", currentPage);
  params.append("limit", itemsPerPage);

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/foods-data/search?${params.toString()}`
  );

  return res.data;
};

const Fridge = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: [
      "foodsData",
      { searchQuery, selectedCategory, currentPage },
    ],
    queryFn: fetchFoodsData,
    keepPreviousData: true,
  });

  const foodsData = data?.foods || [];
  const totalPages = data?.totalPages || 1;

  const today = new Date();
  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(today.getDate() + 5);

  let expiredCount = 0;
  let nearlyExpiredCount = 0;

  if (Array.isArray(foodsData)) {
    foodsData.forEach((food) => {
      const expiryDate = new Date(food.expiryDate);
      if (expiryDate < today) {
        expiredCount++;
      } else if (expiryDate >= today && expiryDate <= fiveDaysFromNow) {
        nearlyExpiredCount++;
      }
    });
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchQuery(searchTerm.trim());
      setCurrentPage(1);
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500">
        {error?.message || "Failed to fetch data"}
      </div>
    );

  return (
    <section className="px-4 mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-9/12 mt-10 md:mt-20">
      <Helmet>
        <title>Fridge - ZeroSpoil</title>
      </Helmet>

      <h1 className="text-5xl w-3/4 mx-auto md:text-6xl text-center mb-10 md:mb-14">
        <span className="text-[#a05cff] italic pr-4">All</span>
        Items
        <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
      </h1>

      <div className="flex justify-center gap-10 mb-8">
        <div className="bg-red-100 text-red-700 px-6 py-3 rounded shadow text-center">
          <p className="font-bold text-lg md:text-xl">Expired Items</p>
          <CountUp
            start={0}
            end={expiredCount}
            duration={1.5}
            separator=","
            className="text-2xl md:text-3xl font-bold text-black"
          />
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded shadow text-center">
          <p className="font-bold text-lg md:text-xl">Nearly Expired Items</p>
          <CountUp
            start={0}
            end={nearlyExpiredCount}
            duration={1.5}
            separator=","
            className="text-2xl md:text-3xl font-bold text-black"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="border-2 border-amber-500 rounded px-4 py-2 w-[80%] md:w-1/3 box-bg"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="border-cyan-500 border-2 rounded px-4 py-2 w-[80%] md:w-1/3 box-bg"
        >
          <option value="">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetable">Vegetables</option>
          <option value="Bakery">Bakery</option>
          <option value="Fruit">Fruits</option>
          <option value="Beverage">Beverages</option>
          <option value="Grains">Grains</option>
          <option value="Poultry">Poultry</option>
          <option value="Seafood">Seafood</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-center mb-10">
        {foodsData.map((foodData) => (
          <FridgeCard key={foodData._id} foodData={foodData} />
        ))}
      </div>

      {/* Modern Pagination with scroll-to-top */}
      {totalPages > 1 && (
        <nav
          aria-label="Page navigation"
          className="flex justify-center mb-20 space-x-2"
        >
          <button
            onClick={() => {
              const newPage = Math.max(currentPage - 1, 1);
              setCurrentPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border transition 
              ${currentPage === 1
                ? "cursor-not-allowed border-gray-300 text-gray-400 bg-gray-100"
                : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              }`}
            aria-label="Previous Page"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-4 py-2 rounded-md border transition
                ${currentPage === i + 1
                  ? "bg-purple-600 text-white border-purple-600 cursor-pointer"
                  : "border-purple-600 text-xl text-gray-700 hover:bg-purple-600 hover:text-white cursor-pointer"
                }`}
              aria-current={currentPage === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => {
              const newPage = Math.min(currentPage + 1, totalPages);
              setCurrentPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border transition
              ${currentPage === totalPages
                ? "cursor-not-allowed border-gray-300 text-gray-400 bg-gray-100"
                : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white cursor-pointer"
              }`}
            aria-label="Next Page"
          >
            Next
          </button>
        </nav>
      )}
      {isFetching && (
        <div className="text-center text-sm text-gray-500 mb-6">
          Updating...
        </div>
      )}
    </section>
  );
};

export default Fridge;
