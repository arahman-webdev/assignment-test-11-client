
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "../hook/useAxiosSecure";

const MyCars = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

  const [cars, setCars] = useState([]);
  const [sortOption, setSortOption] = useState("");


    useEffect(() =>{
      axiosSecure.get(`/cars?email=${user?.email}`, {withCredentials: true})
        .then(res =>{
            const data = res.data;
            setCars(data)
        })
    },[user?.email])

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-test-11-server.vercel.app/cars/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remainingCars = cars.filter((car) => car._id !== id);
              setCars(remainingCars);
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedCars = [...cars];
    if (option === "dateNewest") {
      sortedCars.sort((a, b) => new Date(b.today) - new Date(a.today));
    } else if (option === "dateOldest") {
      sortedCars.sort((a, b) => new Date(a.today) - new Date(b.today));
    } else if (option === "priceLowest") {
      sortedCars.sort((a, b) => a.dailyPrice - b.dailyPrice);
    } else if (option === "priceHighest") {
      sortedCars.sort((a, b) => b.dailyPrice - a.dailyPrice);
    }

    setCars(sortedCars);
  };

  return (
    <div className="py-28">
      <div>
        <h2 className="text-6xl text-black font-bold text-center">My Cars</h2>
      </div>
      <div className="flex justify-end px-4 mb-4">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="dateNewest">Date Added: Newest First</option>
          <option value="dateOldest">Date Added: Oldest First</option>
          <option value="priceLowest">Price: Lowest First</option>
          <option value="priceHighest">Price: Highest First</option>
        </select>
      </div>
      {cars?.length > 0 ? (
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Car Image</th>
                <th className="border border-gray-300 p-2">Car Model</th>
                <th className="border border-gray-300 p-2">Daily Rental Price</th>
                <th className="border border-gray-300 p-2">Availability</th>
                <th className="border border-gray-300 p-2">Date Added</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">
                    <img
                      className="w-16 h-16 object-cover rounded"
                      src={car?.photoUrl}
                      alt=""
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{car.carModel}</td>
                  <td className="border border-gray-300 p-2 text-center">${car.dailyPrice}</td>
                  <td className="border border-gray-300 p-2 text-center">{car.availability}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {car.today ? new Date(car.today).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center space-y-2 space-x-3">
                    <Link
                      to={`/update/${car._id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-center"
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-center"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
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
          <div className="flex justify-center items-center flex-col space-y-4">
            <h2 className="text-5xl text-red-500">There is no added car.</h2>
            <span>To add a car</span>
            <Link className="px-7 py-2 bg-blue-500 text-white font-semibold" to="/add-car">
              Press On It
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
