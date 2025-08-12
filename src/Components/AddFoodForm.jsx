import { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import {
  FaUtensils,
  FaList,
  FaSortAmountUpAlt,
  FaCalendarAlt,
  FaAlignLeft,
  FaImage
} from 'react-icons/fa';

const AddFoodForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    quantity: '',
    unit: 'g',
    expiryDate: '',
    description: '',
    image: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newFood = {
      ...formData,
      quantity: `${formData.quantity} ${formData.unit}`,
      userEmail: user?.email || 'anonymous@example.com',
      addedDate: new Date().toISOString(),
    };

    axios.post(`${import.meta.env.VITE_API_URL}/foods-data`, newFood, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`
      }
    })
      .then(data => {
        if (data.data.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Food Added Successfully!',
            html: `<span class="font-bold text-green-500 text-2xl">Thank you, <span class="text-[#00D3F2] font-bold text-2xl">${user.displayName}</span></span>`,
            confirmButtonText: 'Continue',
            timer: 2000,
            timerProgressBar: true
          });
          navigate("/my-items");
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: err.message || 'Something went wrong',
        });
      });
  };

  return (
    <div className="min-h-screen flex py-20 items-center justify-center ">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-xl">
        <h2 className="text-3xl font-bold text-center text-[#00D3F2] mb-6">Add New Food</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Title */}
          <div>
            <label className="text-sm md:text-lg font-medium text-[#00D3F2] flex items-center gap-2">
              <span className="text-red-500"><FaUtensils /></span> Food Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Fresh Milk"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl placeholder-red-400 focus:bg-black text-[#8338ec] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm md:text-lg font-medium text-[#00D3F2] flex items-center gap-2">
              <span className="text-red-500"><FaList /></span> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl text-[#8338ec] focus:bg-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              required
            >
              <option value="">Select Category</option>
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

          {/* Quantity + Unit */}
          <div>
            <label className="text-sm md:text-lg font-medium text-[#00D3F2] flex items-center gap-2">
              <span className="text-red-500"><FaSortAmountUpAlt /></span> Quantity
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 500"
                className="mt-1 w-full p-3 border border-gray-300 rounded-xl placeholder-red-400 focus:bg-black text-[#8338ec] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
                required
              />
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="mt-1 p-3 border border-gray-300 rounded-xl text-[#8338ec] focus:outline-none focus:ring-2 focus:ring-[#00D3F2] bg-white"
              >
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="pcs">pcs</option>
              </select>
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="text-sm md:text-lg font-medium text-[#00D3F2] flex items-center gap-2">
              <span className="text-red-500"><FaCalendarAlt /></span> Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl text-[#8338ec] focus:bg-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm md:text-lg font-medium text-[#00D3F2] flex items-center gap-2">
              <span className="text-red-500"><FaAlignLeft /></span> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter details..."
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl placeholder-red-400 focus:bg-black text-[#8338ec] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              rows={3}
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-sm md:text-lg font-medium text-[#00D3F2] flex items-center gap-2">
              <span className="text-red-500"><FaImage /></span> Food Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl placeholder-red-400 focus:bg-black text-[#8338ec] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00D3F2]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#00D3F2] hover:bg-[#8338ec] hover:scale-110 cursor-pointer text-white md:text-xl font-bold py-3 rounded-xl transition duration-200"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodForm;
