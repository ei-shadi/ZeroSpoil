import { useState } from "react";

const UpdateForm = ({ item, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: item.title || "",
    quantity: item.quantity || "",
    unit: item.unit || "pcs", // default to 'pcs'
    expiryDate: item.expiryDate || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...item, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6  rounded-lg shadow-lg max-w-10/12 mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Update Food Item</h2>

      {/* Title Field */}
      <div>
        <label htmlFor="title" className=" mb-2 font-semibold text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l8 4" />
          </svg>
          Title
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#8338ec] text-white shadow-sm placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          placeholder="Enter food title"
          required
        />
      </div>

      {/* Quantity and Unit Field */}
      <div>
        <label className=" mb-2 font-semibold text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10-7h-4a1 1 0 00-1 1v3m5 8v4a1 1 0 01-1 1h-3m-6-4H4a1 1 0 01-1-1v-3m16-4h-4a1 1 0 00-1 1v3" />
          </svg>
          Quantity
        </label>
        <div className="flex gap-2">
          <input
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            type="number"
            min="1"
            className="w-2/3 px-4 py-2 rounded-md border border-gray-300 bg-[#8338ec] text-white placeholder-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            placeholder="Amount"
            required
          />
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-1/3 px-3 py-2 rounded-md border border-gray-300 bg-[#8338ec] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          >
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        </div>
      </div>

      {/* Expiry Date Field */}
      <div>
        <label htmlFor="expiryDate" className=" mb-2 font-semibold text-gray-900 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
          </svg>
          Expiry Date
        </label>
        <input
          id="expiryDate"
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-[#8338ec] text-white shadow-sm placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-purple-600 hover:text-white transition duration-300 scale-100 hover:scale-110 cursor-pointer shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-purple-600 text-white font-semibold hover:bg-purple-700 transition duration-300 scale-100 hover:scale-110 cursor-pointer shadow-md"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
