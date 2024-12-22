import { FaCar, FaDollarSign, FaCalendarCheck, FaHeadset } from "react-icons/fa";

import chooseImg from '../assets/images/chooseus.jpg'

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaCar className="text-4xl text-blue-500" />,
            title: "Wide Variety of Cars",
            description: "From budget-friendly options to luxury vehicles.",
        },
        {
            icon: <FaDollarSign className="text-4xl text-green-500" />,
            title: "Affordable Prices",
            description: "Competitive daily rates you can count on.",
        },
        {
            icon: <FaCalendarCheck className="text-4xl text-yellow-500" />,
            title: "Easy Booking Process",
            description: "Seamlessly book your ride in just a few clicks.",
        },
        {
            icon: <FaHeadset className="text-4xl text-red-500" />,
            title: "Customer Support",
            description: "24/7 assistance for all your queries.",
        },
    ];

    return (
        <section className="bg-[#F5F6FE] py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center md:w-4/6 mx-auto py-16">
                    <h2 className="text-3xl font-bold text-[#FF3600] text-center">Why Choose Us?</h2>
                    <p className="text-5xl font-bold">Save money with competitive daily and weekly pricing</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                            <p className="text-gray-600 text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default WhyChooseUs;
