import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router";
import Loader from "../Utilities/Loader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [foodData, setFoodData] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  // Use useCallback to memoize the function and avoid recreating it on every render
  const calculateTimeLeft = useCallback((expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  }, []);

  // Fetch food data once when the id changes
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/food-details/${id}`);
        setFoodData(response.data);
        setTimeLeft(calculateTimeLeft(response.data.expiryDate));
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    fetchFood();
  }, [id, calculateTimeLeft]);

  // Update timeLeft every second but only if expiryDate changes
  useEffect(() => {
    if (!foodData?.expiryDate) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const remaining = calculateTimeLeft(foodData.expiryDate);
        if (prev === remaining) {
          // Avoid unnecessary state update and re-render
          return prev;
        }
        return remaining;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [foodData?.expiryDate, calculateTimeLeft]);

  if (!foodData) return <Loader />;

  const { title, category, quantity, expiryDate, image, userEmail, note, addedDate } = foodData;
  const isExpired = new Date(expiryDate) < new Date();
  const matched = userEmail === user?.email;

  const handleNoteSubmit = async () => {
    if (!matched) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/food-data/${id}`, {
        note: noteText,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );

      if (res.data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Note Added Successfully!",
          html: `<span class="font-bold text-green-500 text-2xl">Thank you, <span class="text-[#00D3F2] font-bold text-2xl">${userEmail}</span></span>`,
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        });

        setFoodData((prev) => ({
          ...prev,
          note: noteText,
        }));
        setNoteText("");
      } else {
        toast.error("Note not added!");
      }
    } catch (err) {
      console.error("Error posting note", err);
      toast.error("Failed to add note.");
    }
  };

  return (
    <>
      <Helmet>
        <title>{title} - ZeroSpoil</title>
      </Helmet>

      <div className="min-h-screen flex justify-center items-center text-white p-6 pb-28 pt-40">
        <div className="w-full bg-gradient-to-t from-[#009CB3] to-black max-w-3xl bg-white/10 backdrop-blur-md border border-white/80 rounded-xl shadow-lg p-6">
          {/* Top: Image */}
          <div className="mb-6">
            <img src={image} alt={title} className="w-full h-72 object-cover rounded-lg shadow-md" />
          </div>

          {/* Middle: Details */}
          <div className="space-y-3 mb-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#00D3F2] to-white bg-clip-text text-transparent">{title}</h2>
            <p>
              <span className="font-semibold text-[#e07a5f]">Category:</span> {category}
            </p>
            <p>
              <span className="font-semibold text-[#e07a5f]">Quantity:</span> {quantity}
            </p>
            <p>
              <span className="font-semibold text-[#e07a5f]">Expires:</span> {expiryDate}
            </p>
            {timeLeft && (
              <p className="font-bold text-xl md:text-2xl text-yellow-500">
                ⏳ Expires in: <span className="text-white">{timeLeft}</span>
              </p>
            )}
            {isExpired && <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full">Expired</span>}
          </div>

          {/* Bottom: Notes */}
          <div className="border-t border-white pt-4">
            <h3 className="text-2xl font-bold mb-3">Add a Note</h3>
            <textarea
              className="w-full p-3 rounded-md bg-white/10 border border-white text-white"
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your note..."
            />
            <button
              type="button"
              onClick={handleNoteSubmit}
              disabled={!matched}
              className={`mt-2 px-6 py-2 rounded-md font-semibold ${
                matched
                  ? "bg-blue-600 hover:bg-[#8338ec] hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Add Note
            </button>

            {/* Show notes */}
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">Notes</h4>
              {note ? (
                <div className="p-3 bg-white/10 border rounded-md mb-2">
                  <p className="text-yellow-400">{note}</p>
                  <p className="text-sm text-gray-300">Posted on {addedDate}</p>
                </div>
              ) : (
                <p>No notes yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetails;
