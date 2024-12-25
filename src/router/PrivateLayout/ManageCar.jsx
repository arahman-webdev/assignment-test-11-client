import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { GiConfirmed } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [manageCar, setManageCar] = useState([]);
    const axiosSecure = useAxiosSecure()

    console.log(manageCar)

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/bookingRequet/${user?.email}`, {withCredentials: true})
            .then((res) => {
                setManageCar(res.data);
            })
            .catch((err) => {
                console.error("Error fetching bookings:", err);
            });
    }, [user?.email]);

    // const handleCancelBooking = (id, prevStatus) => {
    //   if(prevStatus === 'Confirmed' || prevStatus === 'Canceled'){
    //     return console.log('Not Allowed')
    //   }
    //     axios
    //         .delete(`https://assignment-test-11-server.vercel.app/bookings/${id}`)
    //         .then(() => {
    //             setManageCar((prev) => prev.filter((booking) => booking._id !== id));
    //         })
    //         .catch((err) => {
    //             console.error("Error cancelling booking:", err);
    //         });
    // };


    const handleChange = (id, prevStatus) =>{

      if(prevStatus === 'Confirmed' || prevStatus === 'Canceled'){
        return console.log('Not Allowed')
      }

      console.log(id, prevStatus)

      axios.patch(`https://assignment-test-11-server.vercel.app/booking-request-accept/${id}`, {
         status: 'Confirmed',
         availability: 'Unavailable'
      })
      .then(res => {
        const data = res.data;
        console.log(data)
      })
      .catch(error =>{
        console.log(error)
      })
    }


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


    return (
<div className="p-6">
<h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-4">Bookings Request: <span className="bg-[#ECF5FF] px-10 py-1 rounded-full text-blue-500">{manageCar?.length}</span> </h1>

  {manageCar?.length > 0 ? (
    <div className="p-4 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Car Image</th>
            <th className="border border-gray-300 p-2">Car Model</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Status</th>
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
              <td className={`border border-gray-300 p-2 text-center ${car?.status === 'Canceled'? 'text-red-500':'text-yellow-400' && car?.status === 'Confirmed'? 'text-green-500': 'text-yellow-400'}`}>
                    {car?.status}
                  </td>
              <td className="border border-gray-300 p-2 text-center">
                {car?.bookingDate}
              </td>
              <td className="border border-gray-300 p-2 text-center space-y-2">
                {/* Edit Button */}
                <button
                  disabled={car?.status === 'Canceled' || car?.status === 'Confirmed'}
                  className="disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() =>handleChange(car?._id, car?.status)}
                >
                  <GiConfirmed className="text-lg" />
                  
                </button>
                {/* Cancel Button */}
                <button
                disabled={car?.status === 'Canceled' || car?.status === 'Confirmed'}
                  className="disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => handleCancelBooking(car._id, car?.status)}
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
