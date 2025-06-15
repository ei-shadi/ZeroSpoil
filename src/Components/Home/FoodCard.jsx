import { Link } from 'react-router';
import Button from '../../Utilities/Btn';

const FoodCard = ({ foodsData }) => {

  const { title, category, quantity, expiryDate, image, _id } = foodsData;


  return (
    <div className="flex justify-center p-4">
      <div className="w-80 p-5 bg-white/10 backdrop-blur-md border border-white/80 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 bg-gradient-to-t from-[#009CB3] to-black transition duration-300 text-white hover:from-black hover:to-[#009CB3]">
        <img
          src={image}
          alt={name}
          className="w-full h-44 border-red-500 object-cover rounded-md mb-4"
        />
        <div className="text-left">
          <h3 className="text-3xl text-center font-semibold my-5 bg-gradient-to-r from-[#00D3F2] to-white bg-clip-text text-transparent">{title}</h3>

          <p className="text-lg font-semibold text-[#e07a5f] mb-1 pt-2 border-t-2"><span className='text-white'>Category : </span>{category}</p>
          <p className="text-lg font-semibold text-[#e07a5f] mb-1"><span className='text-white'>Quantity : </span>{quantity}</p>
          <p className="text-lg font-semibold text-[#e07a5f] mb-1 pb-2 border-b-2"><span className='text-white'>Expires : </span>{expiryDate}</p>

          <div className='flex justify-center mt-6'>
            <Link to={`/food-details/${_id}`}>
              <Button name="See Details" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
