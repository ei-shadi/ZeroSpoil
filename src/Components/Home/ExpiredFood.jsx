import { Link } from 'react-router';
import Button from '../../Utilities/Btn';

const ExpiredFood = ({ expiredFoodsData }) => {

  const { name, category, quantity, expiryDate, image, _id } = expiredFoodsData;

  
  return (
    <div className="flex justify-center p-4">
      <div className="w-80 p-5 bg-white/10 backdrop-blur-md border border-white/80 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 bg-gradient-to-t from-[#009CB3] to-black transition duration-300 text-white hover:from-black hover:to-[#009CB3]">
        <img
          src={image}
          alt={name}
          className="w-full h-44 border-red-500 object-cover rounded-md mb-4"
        />
        <div className="text-left">
          <h3 className="text-3xl text-center font-semibold my-5 bg-gradient-to-r from-[#00D3F2] to-white bg-clip-text text-transparent">{name}</h3>

          <p className="text-lg font-semibold text-[#e07a5f] mb-1 pt-2 border-t-2"><span className='text-white'>Category : </span>{category}</p>
          <p className="text-lg font-semibold text-[#e07a5f] mb-1"><span className='text-white'>Quantity : </span>{quantity}</p>
          <p className="text-lg font-semibold text-[#e07a5f] mb-1 pb-2 border-b-2"><span className='text-white'>Expires : </span>{expiryDate}</p>

          <div className='mt-8'>
            <h2 className='text-2xl md:text-3xl text-center font-semibold mb-5 bg-red-600 text-white py-2 rounded-full hover:bg-white hover:text-red-600 hover:cursor-pointer'>Expired</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiredFood;
