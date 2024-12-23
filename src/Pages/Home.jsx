import React from 'react';
import Carousel from '../Components/Carosol';
import WhyChooseUs from '../Components/WhyChoose';
import SpecialOffers from '../Components/SpecailOffer';
import CarTable from '../Components/CarTable';
import RecentListings from '../Components/RecentListings';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <WhyChooseUs></WhyChooseUs>
            <SpecialOffers></SpecialOffers>
            <RecentListings></RecentListings>
        </div>
    );
};

export default Home;