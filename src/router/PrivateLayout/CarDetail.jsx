import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Auth/AuthProvider';
import { format } from 'date-fns';
import axios from 'axios';

const CarDetail = () => {
    const car = useLoaderData()
    const {user} = useContext(AuthContext)

    const handleBookNow = () => {
        Swal.fire({
          title: "Confirm Booking",
          html: `
            <div class="text-left">
              <p><strong>Model:</strong> ${car?.carModel}</p>
              <p><strong>Price Per Day:</strong> $${car?.dailyPrice}</p>
              <p><strong>Availability:</strong> ${car?.availability}</p>
              <p><strong>Features:</strong> ${car?.features?.join(", ")}</p>
            </div>
          `,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm Booking",
        }).then((result) => {
          if (result.isConfirmed) {
            // Format the date
            const formattedDate = new Date().toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
      
            // Prepare booking data
            const bookingData = {
              carImage: car?.photoUrl,
              carModel: car?.carModel,
              bookingDate: formattedDate,
              dailyPrice: car?.dailyPrice,
              email: user?.email,
              status: "Pending",
              carId: car?._id,
              buyerName: car?.hr_name,
              buyerEmail: car?.hr_email,
            };
      
            // Send data to the server
            axios
              .post("http://localhost:5000/bookings", bookingData, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                const data = res.data;
                console.log("Booking Response:", data);
      
                // Success notification
                Swal.fire("Booked!", "Your booking is confirmed.", "success");
              })
              .catch((error) => {
                console.error("Error storing booking:", error);
      
                // Error notification
                Swal.fire("Error", "Failed to store booking. Please try again.", "error");
              });
          }
        });
      };
      

    console.log(car)
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

                {/* car information  */}
            <div className='w-4/5 mx-auto'>
            <div className='text-center py-20 space-y-4'>
                <h2 className='text-5xl font-semibold'>Car Detail</h2>
                <p className='text-gray-500'>Discover this stylish, feature-packed car offering comfort, performance, and affordability for your perfect ride!</p>
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

                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full"
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