import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = () => {

    const [loading, setLoading] = useState(true)

        useEffect(() => {
            const loadingTimer = setTimeout(() => setLoading(false), 1000);
            return () => clearTimeout(loadingTimer); // Cleanup timer
        }, []);
    
        useEffect(() => {
            document.title = "Home | RideXpress";
        }, []);
        
    
        if (loading) {
            return (
                <div className="flex justify-center items-center h-screen bg-black">
                    {/* <span className="loading loading-bars loading-lg text-[#CDF7FF]"></span> */}
                    <span className="loading loading-dots loading-lg text-[#CDF7FF]">Ride</span>
                </div>
            );
        }
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;