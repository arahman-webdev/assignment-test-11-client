import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import { Fade, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Carousel = () => {
  // Array with image URLs and text for each slide
  const slides = [
    {
      img: "https://i.ibb.co.com/h2dmDhn/slider4.jpg",
      title: "Drive Your Dreams Today!",
      description: 'Discover the perfect car for your journey. Your next adventure begins here—find the car!'
      
    },
    {
      img: "https://i.ibb.co.com/5T7vBrm/slider-2.jpg",
      title: "Drive Your Dreams Today!",
      description: 'Discover the perfect car for your journey. Your next adventure begins here—find the car!'
      
    },
    {
      img: "https://i.ibb.co.com/m45w9nF/slider-3.jpg",
      title: "Drive Your Dreams Today!",
      description: 'Embark on an exciting journey to own your dream car. Explore endless possibilities and drive!'
    },
  ];

  return (
    <Swiper
      className="z-0"
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      effect="fade"
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          {/* Background Image */}
          <div
            className="w-full h-[500px] md:h-[100vh] bg-cover bg-center transition-transform duration-700 transform hover:scale-105"
            style={{ backgroundImage: `url(${slide.img})` }}
          ></div>

          {/* Overlay with Animated Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020202] bg-opacity-65">
            {/* Fade Animation for Title */}
            <Fade triggerOnce>
              <h2 className="md:text-6xl lg:text-7xl xl:text-8xl text-4xl font-bold font-Roboto text-[#CDF7FF] uppercase text-center md:w-7/12 w-11/12 mx-auto">
                {slide.title}
              </h2>
            </Fade>

            {/* Zoom Animation for Description */}
            <Zoom triggerOnce>
              <p
                className="md:text-2xl text-xl font-semibold font-Roboto text-[#CDF7FF] uppercase text-center  md:w-7/12 w-11/12 mx-auto mb-10 mt-10"
                // style={{
                //   WebkitTextStroke: "1px #CDF7FF",
                //   WebkitTextFillColor: "transparent",
                // }}
              >
                {slide.description}
              </p>
            </Zoom>

            {/* View More Button */}
            <Fade triggerOnce>
              <Link to='/available-cars'
                className=" px-8 py-4 text-lg font-semibold text-white bg-[#FF3600]  rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                
              >
                View Available Cars
              </Link>
            </Fade>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
