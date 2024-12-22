import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaSearch, FaTh, FaList, FaRegCalendarAlt, FaDollarSign } from "react-icons/fa";

const AvailableCar = () => {
    const availableCars = useLoaderData();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [sortOption, setSortOption] = useState("");
    const [filteredCars, setFilteredCars] = useState(availableCars);
    const [errorMessage, setErrorMessage] = useState("");

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
            setErrorMessage("No cars match your search criteria.");
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
        <div className="py-10 px-6 w-4/5 mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Available Cars</h2>

            {/* Search and Sorting Section */}
            <div className="flex flex-wrap items-center justify-between mb-8">
                {/* Search Bar */}
                <div>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    >
                        <option value="">Sort by Date</option>
                        <option value="dateNewest">Date Added: Newest First</option>
                        <option value="dateOldest">Date Added: Oldest First</option>
                    </select>
                </div>
                <div className="flex items-center border rounded-md px-3 py-2 w-full md:w-2/3">
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



                <div className="flex items-center">
                    <div>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border px-3 py-2 rounded-md"
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
                                className={`p-2 border rounded-md ${viewMode === "grid" ? "bg-gray-300" : ""}`}
                                onClick={() => setViewMode("grid")}
                            >
                                <FaTh />
                            </button>
                            <button
                                className={`p-2 border rounded-md ${viewMode === "list" ? "bg-gray-300" : ""}`}
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
                className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}`}>
                {sortedCars.map((car) => (
                    <div
                        key={car._id}
                        className="border rounded-md shadow-md p-4  text-center">

                        <div>
                            <img
                                src={car.photoUrl || "https://via.placeholder.com/150"}
                                alt={car.carModel}
                                className="w-full object-cover rounded mb-3" />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold mb-1">{car.carModel}</h3>
                            <p className="text-gray-500 mb-1">
                                <FaRegCalendarAlt className="inline mr-1" />
                                {car.today ? new Date(car.today).toLocaleDateString() : "N/A"}
                            </p>
                            <p className="text-gray-500 mb-1">
                                <FaDollarSign className="inline mr-1" />
                                ${car.dailyPrice} / day
                            </p>
                            <p className={`mb-3 ${car.availability === "Available" ? "text-green-500" : "text-red-500"}`}>
                                {car.availability}
                            </p>
                        </div>
                        <Link
                            to={`/car/${car._id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Book Now
                        </Link>
                    </div>
                ))}
            </div>

            {/* No Cars Found */}
            {sortedCars.length === 0 && !errorMessage && (
                <p className="text-center text-gray-500 mt-8">No cars available for the selected filters.</p>
            )}
        </div>
    );
};

export default AvailableCar;
