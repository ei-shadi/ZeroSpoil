import { Helmet } from "react-helmet-async";
import AddFoodForm from "../Components/AddFoodForm";


const AddFood = () => {
  return (
    <>
      <Helmet>
        <title>Add Food - ZeroSpoil</title>
      </Helmet>
      <section className=" pt-12 md:pt-20">
        <AddFoodForm />
      </section>
    </>
  );
};

export default AddFood;