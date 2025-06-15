import { Link } from "react-router";
import Button from "../../Utilities/Btn";

const DonateFoodSection = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white bg-[url('https://i.ibb.co/N2324fDt/Donate-Food.jpg')] bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/60"></div> {/* Overlay for readability */}

      <div className="relative z-10 flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-[#f4a261]">
            Share the Goodness, Donate Extra Food 🍲
          </h2>
          <p className="text-lg mb-6 text-white">
            Donate food items that are close to expiry but still safe, connecting them to local food BANKS or NGOs.
          </p>
          <Link 
          to="https://www.foodbanking.org/" target="_blank">
            <Button name="Donate Now" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonateFoodSection;
