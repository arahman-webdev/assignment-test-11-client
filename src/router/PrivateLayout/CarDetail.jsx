import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/AuthProvider";
import { format } from "date-fns";
import axios from "axios";

const CarDetail = () => {
  const car = useLoaderData();
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(""); // State to store selected date

  console.log(car)
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      return Swal.fire({
        icon: "warning",
        title: "Date Missing",
        text: "Please select a booking date before proceeding.",
      });
    }

    if (user?.email === car?.hr_email)
      return Swal.fire({
        icon: "error",
        title: "Action Denied",
        text: "You cannot book a car that you have listed. Please browse other available listings.",
      });

    Swal.fire({
      title: "Confirm Booking",
      html: `
            <div class="text-left">
              <p><strong>Model:</strong> ${car?.carModel}</p>
              <p><strong>Price Per Day:</strong> $${car?.dailyPrice}</p>
              <p><strong>Availability:</strong> ${car?.availability}</p>
              <p><strong>Features:</strong> ${car?.features?.join(", ")}</p>
              <p><strong>Booking Date:</strong> ${format(new Date(selectedDate), "dd-MM-yyyy")}</p>
            </div>
          `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Booking",
    }).then((result) => {
      if (result.isConfirmed) {
        const formattedDate = format(new Date(selectedDate), "dd-MM-yyyy");

        const bookingData = {
          carImage: car?.photoUrl,
          carModel: car?.carModel,
          bookingDate: formattedDate,
          dailyPrice: car?.dailyPrice,
          email: user?.email,
          status: "Pending",
          availability: car?.availability,
          carId: car?._id,
          buyerName: car?.hr_name,
          buyerEmail: car?.hr_email,
        };

        axios
          .post("https://assignment-test-11-server.vercel.app/bookings", bookingData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            Swal.fire("Booked!", "Your booking is confirmed.", "success");
          })
          .catch((error) => {
            Swal.fire("Error", "You have already booked this car.", "error");
          });
      }
    });
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-96 md:h-[500px]"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/SKjZZ15/car-detail-3.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Content on top of the overlay */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Welcome to car detail page</h1>
        </div>
      </div>

      {/* car information */}
      <div className="w-4/5 mx-auto">
        <div className="text-center py-20 space-y-4">
          <h2 className="text-5xl font-semibold">Car Detail</h2>
          <p className="text-gray-500">
            Discover this stylish, feature-packed car offering comfort, performance, and affordability for your perfect ride!
          </p>
        </div>

        {/* car information */}
        <div className="flex flex-col md:flex-row gap-8 px-4 py-8">
          {/* Left: Car Image */}
          <div className="md:w-2/4 w-full">
            <img
              src={car?.photoUrl || "https://via.placeholder.com/300"}
              alt="Car"
              className="w-full object-cover rounded"
            />
          </div>

          {/* Right: Car Details */}
          <div className="md:w-2/4 w-full space-y-4">
            <h2 className="text-3xl font-bold">{car?.carModel}</h2>
            <p className="text-lg">
              <strong>Price Per Day:</strong> ${car?.dailyPrice}
            </p>
            <p className={`text-lg ${car?.availability === "Available" ? "text-green-500" : "text-red-500"}`}>
              <strong>Availability:</strong> {car?.availability}
            </p>
            <p className="text-lg">
              <strong>Features:</strong> {car?.features?.join(", ")}
            </p>
            <p className="text-gray-600">
              <strong>Description:</strong> Discover this stylish, feature-packed car offering comfort, performance, and affordability for your perfect ride!
            </p>
            <p className="text-lg">
              <strong>Reviews:</strong> <em>Coming soon...</em>
            </p>
            <label className="label">
              <span className="label-text font-bold">
                <strong>Please select your date</strong>
              </span>
              <input
                type="date"
                className="input input-bordered"
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
            </label>

            <button
              disabled={car?.availability === 'Unavailable'}
              className={`bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full ${car?.availability === 'Unavailable'? 'bg-gray-400 cursor-not-allowed':'bg-blue-500 text-white hover:bg-blue-600' }`}
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
