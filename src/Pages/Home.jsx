import React from 'react';
import Carousel from '../Components/Carosol';
import WhyChooseUs from '../Components/WhyChoose';
import SpecialOffers from '../Components/SpecailOffer';

import RecentListings from '../Components/RecentListings';
import OurTeam from '../Components/OurTeam';
import OurVission from '../Components/OurVisson';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <WhyChooseUs></WhyChooseUs>
            <SpecialOffers></SpecialOffers>
            <RecentListings></RecentListings>
            <OurTeam></OurTeam>
            <OurVission></OurVission>
        </div>
    );
};

export default Home;