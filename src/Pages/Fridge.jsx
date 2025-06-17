import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router";
import FridgeCard from "../Components/FridgeCard";
import Loader from "../Utilities/Loader";


const Fridge = () => {

  const foodsDataResponse = useLoaderData();
  const foodsData = foodsDataResponse.data;

  if(!foodsData) return <Loader />

  return (
    <section className="lg:w-9/12 mx-auto">
      <Helmet>
        <title>Fridge - ZeroSpoil</title>
      </Helmet>
      <h1 className="text-4xl w-3/4 mx-auto md:text-5xl text-center mb-10 md:mb-14 mt-20">All Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {
          foodsData.map(foodData => <FridgeCard key={foodData._id} foodData={foodData} />)
        }
      </div>
    </section>
  );
};

export default Fridge;