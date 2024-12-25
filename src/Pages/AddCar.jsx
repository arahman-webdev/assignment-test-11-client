
import React, { useContext, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthProvider";
import { formatISO } from "date-fns";
const AddCarForm = () => {

    const { user } = useContext(AuthContext)
    const [images, setImages] = useState([]);

    // const onDrop = (acceptedFiles) => {
    //     setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    // };

    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: "image/*",
    // });

    // const today = new Date().toLocaleDateString();
    const today = formatISO(new Date());

    const handleAddCar = (e) => {
        e.preventDefault();

        const form = e.target;
        const carModel = form.carModel.value;
        const dailyPrice = form.dailyPrice.value;
        const availability = form.availability.value;
        const registrationNumber = form.registrationNumber.value;
        const features = form.features.value;
        const description = form.description.value;
        const photoUrl = form.photo_url.value;
        const location = form.location.value;
        const bookingCount = 0; // Default value
        const booking_status = "Pending";

        const carInfo = {
            carModel,
            dailyPrice,
            availability,
            registrationNumber,
            features: features.split(",").map((feature) => feature.trim()),
            description,
            location,
            bookingCount,
            photoUrl,
            images,
            today,
            booking_status,
            hr_name: user?.displayName,
            hr_email: user?.email,
            hr_img: user?.photoURL
        };

        console.log("Car Info:", carInfo);



        fetch('https://assignment-test-11-server.vercel.app/add-car', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(carInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.insertedId){
                    Swal.fire({
                        title: "Good job!",
                        text: "You added a car!",
                        icon: "success"
                      });
                }
            })
    };

    return (
        <div className="py-10">

            <form
                onSubmit={handleAddCar}
                className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg border"
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

                

                {/* photot url  */}

                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-semibold mb-2">
                        Photo Url
                    </label>
                    <input
                        type="url"
                        id="photoUrl"
                        name="photo_url"
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the car's location"
                        
                    />
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
                        Add Car Info
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCarForm;
