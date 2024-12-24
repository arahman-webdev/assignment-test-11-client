import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { FaCalendarAlt, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [manageCar, setManageCar] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`http://localhost:5000/bookingRequet/${user.email}`)
            .then((res) => {
                setManageCar(res.data);
            })
            .catch((err) => {
                console.error("Error fetching bookings:", err);
            });
    }, [user?.email]);

    const handleCancelBooking = (id) => {
        axios
            .delete(`http://localhost:5000/bookings/${id}`)
            .then(() => {
                setManageCar((prev) => prev.filter((booking) => booking._id !== id));
            })
            .catch((err) => {
                console.error("Error cancelling booking:", err);
            });
    };

    return (
<div className="p-6">
<h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-4">Bookings Request: <span className="bg-green-500 px-10 py-1 rounded-full text-white">{manageCar?.length}</span> </h1>

  {manageCar?.length > 0 ? (
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
          {manageCar.map((car) => (
            <tr key={car._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2 text-center">
                <img
                  className="w-16 h-16 object-cover rounded"
                  src={car?.carImage || "https://via.placeholder.com/150"}
                  alt="Car"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">{car.carModel}</td>
              <td className="border border-gray-300 p-2 text-center">${car.dailyPrice}</td>
              <td className="border border-gray-300 p-2 text-center">{car.availability}</td>
              <td className="border border-gray-300 p-2 text-center">
                {car?.bookingDate}
              </td>
              <td className="border border-gray-300 p-2 text-center space-y-2">
                {/* Edit Button */}
                <button
                  className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => console.log(`Edit booking for: ${car._id}`)}
                >
                  <GiConfirmed className="text-lg" />
                  
                </button>
                {/* Cancel Button */}
                <button
                  className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => handleCancelBooking(car._id)}
                >
                  <TiCancel className="text-lg" />
                 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div
      className="flex justify-center items-center"
      style={{ height: `calc(100vh - 390px)` }}
    >
      <div className="flex flex-col justify-center items-center space-y-4">
        <h2 className="text-5xl text-red-500">No Bookings Found</h2>
        <p className="text-gray-600">Looks like No one has booked any cars yet!</p>
      </div>
    </div>
  )}
</div>

    );
};

export default MyBooking;
