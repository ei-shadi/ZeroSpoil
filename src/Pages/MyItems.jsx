import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Modal from "../Utilities/Modal";
import UpdateForm from "../Utilities/UpdateForm";
import { AuthContext } from "../Provider/AuthProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const MyItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/food-data-by-email/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching items:", err));
  }, [user]);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/foods-data/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setItems(prev => prev.filter(item => item._id !== id));
      setDeleteModalOpen(false);
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Failed to delete the item.", "error");
    }
  };
  // Handle Update
  const handleUpdate = async (updatedItem) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/foods-data/${updatedItem._id}`, updatedItem);
      setItems(prev =>
        prev.map(item => (item._id === updatedItem._id ? updatedItem : item))
      );
      setUpdateModalOpen(false);
      Swal.fire("Updated!", "Your item has been updated.", "success");
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", "Failed to update the item.", "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>My Items - ZeroSpoil</title>
      </Helmet>
      <div className="w-11/12 md:w-9/12 mx-auto my-20">
      <h2 className="text-4xl w-3/4 mx-auto md:text-5xl text-center my-10 text-color">My Food Items</h2>
        <div className="p-4 bg-gradient-to-t from-[#009CB3] to-black">
          
          <div className="overflow-x-auto rounded shadow">
            <table className="min-w-full border text-white text-center">
              <thead className="bg-[#8338ec] md:text-2xl text-[#00D3F2] my-font">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Expires On</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody className="md:text-lg font-semibold">
                {items.map(item => (
                  <tr key={item._id}>
                    <td className="border p-2">{item.title}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.expiryDate}</td>
                    <td className="border-b p-5 flex flex-col md:flex-row justify-center  gap-5">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setUpdateModalOpen(true);
                        }}
                        className="text-blue-400 text-lg hover:scale-125 transition hover:cursor-pointer"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setDeleteModalOpen(true);
                        }}
                        className="text-red-500 text-lg hover:scale-125 transition hover:cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Update Modal */}
          {isUpdateModalOpen && (
            <Modal onClose={() => setUpdateModalOpen(false)}>
              <UpdateForm
                item={selectedItem}
                onSubmit={handleUpdate}
                onClose={() => setUpdateModalOpen(false)}
              />
            </Modal>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <Modal onClose={() => setDeleteModalOpen(false)}>
              <div className="p-4">
                <h2 className="text-lg mb-4 text-red-500 ">Are you sure you want to delete this item?</h2>
                  <button
                    onClick={() => handleDelete(selectedItem._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:cursor-pointer hover:bg-[#8338ec] hover:text-white transition duration-300 hover:scale-110"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="bg-gray-300 px-4 py-2 rounded  hover:cursor-pointer hover:bg-[#8338ec] hover:text-white transition duration-300 hover:scale-110"
                  >
                    Cancel
                  </button>
                </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default MyItems;
