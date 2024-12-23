import React from "react";
import { Link } from "react-router-dom";

const SpecialOffers = () => {
    const offers = [
        {
            title: "Get 15% Off for Weekend!",
            description: "Enjoy exclusive discounts on weekend rides. Book now to save big on your next adventure!",
            buttonText: "Learn More",
            background: "bg-white",
        },
        {
            title: "Luxury Cars at $99/Day!",
            description: "This holiday season, drive in style with our premium vehicles at unbeatable rates and enjoy more.",
            buttonText: "Book Now",
            background: "bg-white",
        },
        {
            title: "Free Upgrades on SUVs!",
            description: "Upgrade to a larger, more spacious SUV at no extra cost. Limited time offer!. Don't miss",
            buttonText: "Explore Deals",
            background: "bg-white",
        },
    ];

    return (
        <section className=" bg-[#FFF] py-36">
            <div className="w-4/5 mx-auto px-6 lg:px-8">
                <div className="text-center md:w-5/6 mx-auto py-16 space-y-7">
                    <h2 className="text-3xl font-bold text-[#FF3600] text-center">Special Offers</h2>
                    <p className="text-4xl font-bold">Unlock amazing discounts and enjoy your next ride for less with our exclusive offers!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            className={`group px-10 py-14 rounded-lg shadow-md text-black border transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-[#ff3700d0] hover:text-white ${offer.background}`}
                        >
                            <h3 className="text-2xl font-bold mb-4">{offer.title}</h3>
                            <p className="mb-6">{offer.description}</p>
                            <Link to='/available-cars' className="px-4 py-2 bg-[#FF3600] font-semibold rounded text-white transition-all duration-300 group-hover:bg-black group-hover:text-white">
                                {offer.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
