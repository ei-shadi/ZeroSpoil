import { useState } from "react";

const UpdateForm = ({ item, onSubmit, onClose }) => {
  // Split quantity & unit when loading
  const [formData, setFormData] = useState({
    title: item.title || "",
    quantity: item.quantity
      ? item.quantity.replace(/[^0-9.]/g, "") // number part
      : "",
    unit: item.quantity
      ? item.quantity.replace(/[0-9.]/g, "") // unit part
      : "pcs",
    expiryDate: item.expiryDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mergedQuantity = `${formData.quantity}${formData.unit}`;
    onSubmit({
      ...item,
      ...formData,
      quantity: mergedQuantity, // merge before sending to DB
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 rounded-3xl shadow-lg text-white"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide drop-shadow-lg">
        Update Food Item
      </h2>

      {/* Title */}
      <div className="mb-6">
        <label className="font-semibold mb-2 block">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter food title"
          className="w-full px-4 py-3 rounded-xl bg-white text-black font-medium shadow-inner focus:outline-none"
        />
      </div>

      {/* Quantity + Unit */}
      <div className="mb-6">
        <label className="font-semibold mb-2 block">Quantity</label>
        <div className="flex gap-3">
          <input
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            placeholder="Amount"
            className="flex-grow px-4 py-3 rounded-xl bg-white text-black font-medium shadow-inner focus:outline-none"
          />
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-24 px-3 py-3 rounded-xl bg-white text-black font-medium shadow-inner focus:outline-none"
          >
            <option value="pcs">pcs</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
          </select>
        </div>
      </div>

      {/* Expiry Date */}
      <div className="mb-8">
        <label className="font-semibold mb-2 block">Expiry Date</label>
        <input
          name="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white text-black font-medium shadow-inner focus:outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 bg-red-500 text-white rounded-xl hover:scale-105 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-lime-600 text-white rounded-xl hover:scale-105 transition"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
