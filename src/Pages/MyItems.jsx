import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Modal from "../Shared/Modal";
import UpdateForm from "../Shared/UpdateForm";
import { AuthContext } from "../Provider/AuthProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../Shared/Loader";

const fetchItems = async ({ queryKey }) => {
  const [_key, email, token] = queryKey;
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/food-data-by-email/${email}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

const MyItems = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch with React Query
  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myItems", user?.email, user?.accessToken],
    queryFn: fetchItems,
    enabled: !!user?.email && !!user?.accessToken,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/foods-data/${id}`,
        {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myItems", user?.email, user?.accessToken]);
      setDeleteModalOpen(false);
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the item.", "error");
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedItem) => {
      return axios.put(
        `${import.meta.env.VITE_API_URL}/foods-data/${updatedItem._id}`,
        updatedItem
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myItems", user?.email, user?.accessToken]);
      setUpdateModalOpen(false);
      Swal.fire("Updated!", "Your item has been updated.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update the item.", "error");
    },
  });

  // UI states
  if (isLoading) {
    return <Loader/>
  }

  if (isError) {
    return (
      <div className="w-11/12 md:w-9/12 mx-auto text-center py-20">
        <p className="text-2xl text-red-500 font-bold">Error loading items.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Items - ZeroSpoil</title>
      </Helmet>
      <div className="w-11/12 md:w-9/12 mx-auto mt-10 md:mt-20">
        <h2 className="text-5xl w-80 md:w-full mx-auto md:text-6xl text-center mb-10 text-color">
          <span className="text-[#a05cff] italic pr-4">My Food</span>
          Items
          <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
        </h2>
        <div className="p-4 bg-gradient-to-t from-[#009CB3] to-black">
          <div className="overflow-x-auto rounded shadow">
            {items.length > 0 ? (
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
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td className="border p-2">{item.title}</td>
                      <td className="border p-2">{item.quantity}</td>
                      <td className="border p-2">{item.expiryDate}</td>
                      <td className="border-b p-5 flex flex-col md:flex-row justify-center gap-5">
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
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded shadow">
                <HiOutlineExclamationCircle className="text-6xl text-[#8338EC] mb-4" />
                <p className="text-2xl md:text-3xl font-bold px-5 text-center text-[#8338EC]">
                  No items found. Please add some food items.
                </p>
              </div>
            )}
          </div>

          {/* Update Modal */}
          {isUpdateModalOpen && (
            <Modal onClose={() => setUpdateModalOpen(false)}>
              <UpdateForm
                item={selectedItem}
                onSubmit={(updatedItem) => updateMutation.mutate(updatedItem)}
                onClose={() => setUpdateModalOpen(false)}
              />
            </Modal>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <Modal onClose={() => setDeleteModalOpen(false)}>
              <div className="p-4">
                <h2 className="text-lg mb-4 text-red-500 ">
                  Are you sure you want to delete this item?
                </h2>
                <button
                  onClick={() => deleteMutation.mutate(selectedItem._id)}
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
