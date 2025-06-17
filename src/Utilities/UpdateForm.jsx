import { useState } from "react";

const UpdateForm = ({ item, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: item.title || "",
    quantity: item.quantity || "",
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Update Food Item</h2>
      
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:cursor-pointer hover:bg-[#8338ec] hover:text-white transition duration-300 hover:scale-110"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-[#8338ec] hover:text-white transition duration-300 hover:scale-110"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
