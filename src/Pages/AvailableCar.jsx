import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaSearch, FaTh, FaList, FaRegCalendarAlt, FaDollarSign } from "react-icons/fa";
import { IoLogoModelS } from "react-icons/io";


const AvailableCar = () => {
    const availableCars = useLoaderData();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [sortOption, setSortOption] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        const availableCar = availableCars.filter(car => car.availability === "Available")
        setFilteredCars(availableCar)
    }, [availableCars])

    // Handle Search Button Click
    const handleSearch = () => {
        const results = availableCars.filter(
            (car) =>
                car.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (results.length > 0) {
            setFilteredCars(results);
            setErrorMessage(""); // Clear error message
        } else {
            setFilteredCars([]); // No results found
            setErrorMessage("No cars match your search key.");
        }
    };

    // Sort cars based on selected option
    const sortedCars = [...filteredCars].sort((a, b) => {
        if (sortOption === "dateNewest") return new Date(b.today) - new Date(a.today);
        if (sortOption === "dateOldest") return new Date(a.today) - new Date(b.today);
        if (sortOption === "priceLowest") return a.dailyPrice - b.dailyPrice;
        if (sortOption === "priceHighest") return b.dailyPrice - a.dailyPrice;
        return 0;
    });

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
                    <h1 className="text-white text-4xl md:text-5xl font-bold">Welcome to Our Cars</h1>
                </div>
            </div>
            <div className="py-10 px-6 w-4/5 mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8">Available Cars</h2>

                {/* Search and Sorting Section */}
                <div className="flex flex-wrap items-center justify-between mb-8">
                    {/* Search Bar */}
                    <div>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border px-3 py-4 rounded-md"
                        >
                            <option value="">Sort by Date</option>
                            <option value="dateNewest">Date Added: Newest First</option>
                            <option value="dateOldest">Date Added: Oldest First</option>
                        </select>
                    </div>
                    <div className="flex items-center border rounded-md px-3 py-2 w-full md:w-2/4">
                        <FaSearch className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search by model, brand, or location"
                            className="outline-none flex-grow"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>



                    <div className="flex items-center gap-4">
                        <div>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="border px-3 py-4 rounded-md"
                            >
                                <option value="">Sort by Price</option>
                                <option value="priceLowest">Price: Lowest First</option>
                                <option value="priceHighest">Price: Highest First</option>
                            </select>
                        </div>

                        {/* Sorting Options */}
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            {/* View Toggle */}
                            <div className="flex items-center space-x-2">
                                <button
                                    className={`p-2 px-4 py-4 border rounded-md ${viewMode === "grid" ? "bg-gray-300" : ""}`}
                                    onClick={() => setViewMode("grid")}
                                >
                                    <FaTh />
                                </button>
                                <button
                                    className={`px-4 py-4 border rounded-md ${viewMode === "list" ? "bg-gray-300" : ""}`}
                                    onClick={() => setViewMode("list")}
                                >
                                    <FaList />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-center text-red-500 mb-4">{errorMessage}</p>
                )}

                {/* Cars Display */}
                <div
                    className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
                        }`}
                >
                    {sortedCars.map((car) => (
                        <div
                            key={car._id}
                            className="border rounded-md flex flex-col shadow-md p-4 text-center h-full"
                        >
                            {/* Image */}
                            <div>
                                <img
                                    src={car?.photoUrl || "https://via.placeholder.com/150"}
                                    alt={car?.carModel}
                                    className="w-full object-cover rounded mb-3"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-between flex-grow">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold mb-1 flex items-center gap-4"><span><IoLogoModelS /></span>{car.carModel}</h3>
                                    <p className="text-gray-500 mb-1 flex pb-4">
                                        {car?.description.substring(0, 32)}.......
                                    </p>

                                    <hr className="pt-4"></hr>
                                    <p className="text-gray-500 mb-1 flex items-center gap-6">
                                        <span className="font-bold text-black"><FaDollarSign className="inline" />Fee </span>  <span>${car.dailyPrice} / day</span>

                                    </p>

                                    <p
                                        className={`mb-3 ${car.availability === "Available" ? "text-green-500 flex gap-5" : "text-red-500"
                                            }`}
                                    >
                                        <span className="text-black font-bold">Availability:</span> <span>{car?.availability}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <span className="text-black font-bold mr-3">Featur:</span> <span>{car?.features.map(feature =>
                                            <span className="mr-3">
                                                {feature},
                                            </span>)}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <span className="text-black font-bold mr-3">Location:</span><span>{car?.location}</span>
                                    </p>
                                    <p className=" text-black font-bold">
                                        Bookings: <span className="font-bold text-gray-500">{car.bookingCount || 0}</span>
                                    </p>
                                </div>
                                {/* Button */}
                                <Link
                                    to={`/detail/${car._id}`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>


                {/* No Cars Found */}
                {sortedCars.length === 0 && !errorMessage && (
                    <p className="text-center text-gray-500 mt-8">No cars available for the selected filters.</p>
                )}
            </div>
        </div>

    );
};

export default AvailableCar;
