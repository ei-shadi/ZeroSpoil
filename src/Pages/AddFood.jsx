import { Helmet } from "react-helmet-async";
import AddFoodForm from "../Components/AddFoodForm";


const AddFood = () => {
  return (
    <>
      <Helmet>
        <title>Add Food - ZeroSpoil</title>
      </Helmet>
      <section>
        <AddFoodForm />
      </section>
    </>
  );
};

export default AddFood;