import { useState } from "react";

const UpdateForm = ({ item, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: item.title || "",
    quantity: item.quantity || "",
    unit: item.unit || "pcs", // default to 'pcs'
    expiryDate: item.expiryDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...item, ...formData });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 rounded-3xl shadow-lg text-white"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide drop-shadow-lg">
        Update Food Item
      </h2>

      {/* Title Field */}
      <div className="mb-6">
        <label
          htmlFor="title"
          className="flex items-center gap-3 font-semibold text-white mb-2 select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
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
          placeholder="Enter food title"
          required
          className="w-full px-4 py-3 rounded-xl bg-white text-black font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-black transition duration-300"
        />
      </div>

      {/* Quantity and Unit Field */}
      <div className="mb-6">
        <label
          className="flex items-center gap-3 font-semibold text-white mb-2 select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v4a1 1 0 001 1h3m10-7h-4a1 1 0 00-1 1v3m5 8v4a1 1 0 01-1 1h-3m-6-4H4a1 1 0 01-1-1v-3m16-4h-4a1 1 0 00-1 1v3"
            />
          </svg>
          Quantity
        </label>
        <div className="flex gap-3">
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Amount"
            required
            className="flex-grow px-4 py-3 rounded-xl bg-white text-black font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-black transition duration-300"
          />
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-24 px-3 py-3 rounded-xl bg-white text-black font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-black transition duration-300"
          >
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        </div>
      </div>

      {/* Expiry Date Field */}
      <div className="mb-8">
        <label
          htmlFor="expiryDate"
          className="flex items-center gap-3 font-semibold text-white mb-2 select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
            />
          </svg>
          Expiry Date
        </label>
        <input
          id="expiryDate"
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white text-black font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-black transition duration-300"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 bg-red-500 hover:bg-black hover:text-red-500 cursor-pointer text-white rounded-xl font-semibold transition duration-400 ease-in-out hover:scale-110 shadow-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-lime-600 rounded-xl font-semibold text-white hover:bg-black hover:text-lime-500 hover:scale-110 transition duration-400 ease-in-out shadow-lg cursor-pointer"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
