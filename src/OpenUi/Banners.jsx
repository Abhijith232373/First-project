// src/components/ImageSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import HomeInteriors from "../assets/Banners/Home_Interiors.jpg";
import Dining from "../assets/Banners/Dining_starting_Slideshow.png";
import Storage from "../assets/Banners/Storage_beds_starting.png";
import SofaBeds from "../assets/Banners/Sofa_Cum_Beds_Slidehsow-min.png";

const Banners = () => {
  return (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen p-2 sm:p-4 md:p-8 lg:p-12 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    loop={true}
    pagination={{ clickable: true }}
    className="w-full h-full"
  >
    
    <SwiperSlide>
      <img src={HomeInteriors} alt="Home Interiors" className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={Dining} alt="Dining Sets" className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={Storage} alt="Storage Beds" className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={SofaBeds} alt="Sofa Beds" className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl" />
    </SwiperSlide>
  </Swiper>
</div>


    
  );
};

export default Banners;
