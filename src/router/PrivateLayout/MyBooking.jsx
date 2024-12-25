import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { FaCalendarAlt } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";

import Rechart from "../../Components/Rechart";
import useAxiosSecure from "../../hook/useAxiosSecure";

const MyBooking = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);
  const [bookingCar, setBookingCar] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/bookings/${user.email}`, {withCredentials:true})
      .then((res) => setBookingCar(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [user?.email]);

  const handleEditBooking = (car) => {
    // Editing functionality...
  };

  const handleCancelBooking = (id, prevStatus) => {
    // Cancel functionality...
  };

  // Prepare data for Rechart
  const chartData = bookingCar.map((car) => ({
    name: car.carModel || "Unknown",
    dailyPrice: car.dailyPrice || 0,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-4">
        My Bookings:
        <span className="bg-[#ECF5FF] px-10 py-1 rounded-full text-blue-500">
          {bookingCar.length}
        </span>
      </h1>

      {bookingCar?.length > 0 ? (
        <>
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">Car Image</th>
                  <th className="border border-gray-300 p-2">Car Model</th>
                  <th className="border border-gray-300 p-2">Total Price</th>
                  <th className="border border-gray-300 p-2">Availability</th>
                  <th className="border border-gray-300 p-2">Booking Date</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookingCar.map((car) => (
                  <tr key={car._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 text-center">
                      <img
                        className="w-16 h-16 object-cover rounded"
                        src={car?.carImage || "https://via.placeholder.com/150"}
                        alt="Car"
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {car?.carModel}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      ${car?.dailyPrice}
                    </td>
                    <td
                      className={`border border-gray-300 p-2 text-center ${
                        car?.status === "Canceled"
                          ? "text-red-500"
                          : car?.status === "Confirmed"
                          ? "text-green-500"
                          : "text-yellow-400"
                      }`}
                    >
                      {car?.status}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {car?.bookingDate || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2 text-center space-y-2">
                      <button
                        disabled={
                          car?.status === "Canceled" || car?.status === "Confirmed"
                        }
                        className="disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition duration-300"
                        onClick={() => handleEditBooking(car)}
                      >
                        <FaCalendarAlt className="text-lg" />
                        <span>Edit</span>
                      </button>
                      <button
                        disabled={
                          car?.status === "Canceled" || car?.status === "Confirmed"
                        }
                        className="disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition duration-300"
                        onClick={() => handleCancelBooking(car._id, car?.status)}
                      >
                        <TiCancel className="text-lg" />
                        <span>Cancel</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add the Rechart below the table */}
          <div className="w-4/5 mx-auto">
          <Rechart data={chartData} />
          </div>
        </>
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ height: `calc(100vh - 390px)` }}
        >
          <div className="flex flex-col justify-center items-center space-y-4">
            <h2 className="text-5xl text-red-500">No Booking Requests Found</h2>
            <p className="text-gray-600">
              Looks like you haven't booked any cars yet!
            </p>
            <Link
              to="/add-car"
              className="px-7 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Book a Car Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
