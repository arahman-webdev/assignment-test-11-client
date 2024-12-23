import axios from "axios";
import React, { useEffect, useState } from "react";

const RecentListings = () => {
  const [listingCars, setListingCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cars").then((res) => {
      const data = res.data;
      setListingCars(data);
    });
  }, []);

  return (
    <section className="bg-[#F5F6FE] py-36">
      <div className="w-4/5 mx-auto px-6 lg:px-8">
        <div className="text-center md:w-5/6 mx-auto py-16 space-y-7">
          <h2 className="text-3xl font-bold text-[#FF3600] text-center">Recent Listing Cars</h2>
          <p className="text-4xl font-bold">
            Unlock amazing discounts and enjoy your next ride for less with our exclusive offers!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listingCars.map((car) => (
            <div
              key={car._id}
              className="border rounded-md shadow-lg bg-white p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
            >
              <div className="mb-3">
                <img
                  src={car.photoUrl || "https://via.placeholder.com/150"}
                  alt={car.carModel}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">{car.carModel || "Model Not Available"}</h3>
                <p className="text-gray-500 mb-1">
                  <span className="font-bold">Daily Price:</span> ${car.dailyPrice || "N/A"}/day
                </p>
                <p
                  className={`font-bold mb-1 ${
                    car.availability === "Available" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {car.availability || "N/A"}
                </p>
                <p className="text-gray-400 text-sm">
                  {car.today ? `Added ${new Date(car.today).toLocaleDateString()}` : "Date Not Available"}
                </p>
              </div>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListings;
