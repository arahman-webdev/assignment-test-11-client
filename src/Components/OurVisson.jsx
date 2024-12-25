import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // React Confirm Icon for success

const OurVission = () => {
  return (
    <div className="p-6 bg-white">
        <div className="w-4/5 mx-auto">
        <div className="text-center pb-32 w-full md:w-3/5 mx-auto">
            <h2 className="bg-[#e2efff] text-[#FF3600] font-semibold px-7 py-2 rounded-full inline-block ">Our Mission </h2>
            <p className="md:text-5xl text-4xl font-bold text-[#040401]">Driving excellence and innovation in car rental services</p>
        </div>
      <div className=" flex flex-col md:flex-row gap-12 items-center">
        {/* Left Side: Mission */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-5xl font-bold text-gray-900 md:block hidden">Pioneering excellence in car rental services</h2>
          <p className="text-lg text-gray-700 md:pt-10 md:pb-10">
            Driving excellence and innovation in car rental services. We are committed to providing
            our customers with the best vehicles, the most flexible options, and a seamless rental
            experience. We aim to continually innovate and integrate the latest technology into our services. From easy online bookings to advanced vehicle tracking systems, our goal is to make the car rental process seamless and efficient for our customers. Quality is at the heart of everything we do. We maintain a diverse fleet of well-maintained vehicles that meet the highest standards of safety and comfort.
          </p>
          
          <div className="space-y-4 ">
            {/* Mission Points with React Icon */}
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500 text-xl" />
              <p>Provide high-quality and well-maintained vehicles to our customers.</p>
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500 text-xl" />
              <p>Offer flexible rental terms that suit every individual’s needs.</p>
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500 text-xl" />
              <p>Ensure a smooth and hassle-free rental experience every time.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 ">
          <img
            src="https://i.ibb.co.com/j8L9HVR/our-vision-img.jpg" // Replace with car rental-related image URL
            alt="Car Rental"
            className="w-full h-full  object-cover rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default OurVission;
