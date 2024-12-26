import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { FaCalendarAlt } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";

import Rechart from "../../Components/Rechart";

import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";

const MyBooking = () => {


  
   const [loading, setLoading] = useState(true)
  
  const { user } = useContext(AuthContext);
  const [bookingCar, setBookingCar] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    
    axios
      .get(`https://assignment-test-11-server.vercel.app/bookings/${user.email}`)
      .then((res) => setBookingCar(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [user?.email]);



  const handleEditBooking = (car) => {
    // Helper function to validate dates
    const isValidDate = (date) => !isNaN(Date.parse(date));
  
    // Log the car object for debugging
    console.log("Editing car:", car);
  
    Swal.fire({
      title: "Modify Booking Date",
      html: `
        <label for="bookingDate" class="block text-left mb-2">Booking Date:</label>
        <input id="bookingDate" type="date" class="swal2-input" value="${
          isValidDate(car?.bookingDate)
            ? format(new Date(car.bookingDate), "yyyy-MM-dd")
            : ""
        }">
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      preConfirm: () => {
        const bookingDate = document.getElementById("bookingDate").value;
  
        if (!bookingDate) {
          Swal.showValidationMessage("Booking date is required!");
          return null;
        }
  
        return { bookingDate };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { bookingDate } = result.value;
  
        // API call to update booking date
        axios
          .patch(`https://assignment-test-11-server.vercel.app/bookingRequet/${car?._id}`, {
            bookingDate,
          })
          .then(() => {
            // Update the local state to reflect the change
            setBookingCar((prev) =>
              prev.map((item) =>
                item._id === car._id ? { ...item, bookingDate } : item
              )
            );
            Swal.fire("Updated!", "Booking date has been updated.", "success");
          })
          .catch((err) => {
            console.error("Error updating booking date:", err);
            Swal.fire("Error!", "Failed to update booking date.", "error");
          });
      }
    });
  };
  
  
      
    






  const handleCancelBooking = (id, prevStatus) => {
    // Prevent cancellation if the previous status is 'Completed' or already 'Canceled'
    if (prevStatus === 'Completed' || prevStatus === 'Canceled') {
      return console.log('Not Allowed');
    }
  
    console.log(id, prevStatus);
  
    // Show confirmation dialog before canceling
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Update the booking status to 'Canceled'
        axios.patch(`https://assignment-test-11-server.vercel.app/booking-request-accept/${id}`, { status: 'Canceled' })
          .then(res => {
            console.log(res.data);
            const data = res.data;
            if (data.modifiedCount) {
              Swal.fire({
                title: "Canceled!",
                text: "The booking has been canceled.",
                icon: "success"
              });
  
              // Update the state to reflect the cancellation in real-time
              setManageCar((prevBookings) =>
                prevBookings.map((car) =>
                  car._id === id ? { ...car, status: 'Canceled' } : car
                )
              );
            }
          })
          .catch(error => {
            console.log(error);
            Swal.fire("Error!", "Failed to cancel the booking. Try again.", "error");
          });
      }
    });
  };


  // Prepare data for Rechart
  const chartData = bookingCar.map((car) => ({
    name: car.carModel || "Unknown",
    dailyPrice: car.dailyPrice || 0,
  }));

  useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(loadingTimer); // Cleanup timer
}, []);

useEffect(() => {
    document.title = "MyBooking | RideXpress";
}, []);


if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-black">
            {/* <span className="loading loading-bars loading-lg text-[#CDF7FF]"></span> */}
            <span className="loading loading-dots loading-lg text-[#CDF7FF]">Ride</span>
        </div>
    );
}

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
