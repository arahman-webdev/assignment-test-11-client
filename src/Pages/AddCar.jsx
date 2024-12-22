import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const AddCarForm = () => {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleAddCar = (e) => {
    e.preventDefault();

    const form = e.target;
    const carModel = form.carModel.value;
    const dailyPrice = form.dailyPrice.value;
    const availability = form.availability.value;
    const registrationNumber = form.registrationNumber.value;
    const features = form.features.value;
    const description = form.description.value;
    const location = form.location.value;
    const bookingCount = 0; // Default value
    const carInfo = {
      carModel,
      dailyPrice,
      availability,
      registrationNumber,
      features: features.split(",").map((feature) => feature.trim()),
      description,
      location,
      bookingCount,
      images,
    };

    console.log("Car Info:", carInfo);

    // Add logic to submit `carInfo` to your backend
  };

  return (
    <form
      onSubmit={handleAddCar}
      className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Add a Car</h2>

      {/* Car Model */}
      <div className="mb-4">
        <label htmlFor="carModel" className="block text-sm font-semibold mb-2">
          Car Model
        </label>
        <input
          type="text"
          id="carModel"
          name="carModel"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter car model"
          required
        />
      </div>

      {/* Daily Rental Price */}
      <div className="mb-4">
        <label
          htmlFor="dailyPrice"
          className="block text-sm font-semibold mb-2"
        >
          Daily Rental Price ($)
        </label>
        <input
          type="number"
          id="dailyPrice"
          name="dailyPrice"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter daily rental price"
          required
        />
      </div>

      {/* Availability */}
      <div className="mb-4">
        <label
          htmlFor="availability"
          className="block text-sm font-semibold mb-2"
        >
          Availability
        </label>
        <select
          id="availability"
          name="availability"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>

      {/* Vehicle Registration Number */}
      <div className="mb-4">
        <label
          htmlFor="registrationNumber"
          className="block text-sm font-semibold mb-2"
        >
          Vehicle Registration Number
        </label>
        <input
          type="text"
          id="registrationNumber"
          name="registrationNumber"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter registration number"
          required
        />
      </div>

      {/* Features */}
      <div className="mb-4">
        <label htmlFor="features" className="block text-sm font-semibold mb-2">
          Features (comma-separated)
        </label>
        <input
          type="text"
          id="features"
          name="features"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., GPS, AC, Bluetooth"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-semibold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Enter a description of the car"
        ></textarea>
      </div>

      {/* Images */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Upload Images</label>
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">Drag & drop images, or click to upload</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {images.map((file, index) => (
            <div key={index} className="w-24 h-24 border rounded">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-semibold mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the car's location"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition-all"
        >
          Add Car
        </button>
      </div>
    </form>
  );
};

export default AddCarForm;
