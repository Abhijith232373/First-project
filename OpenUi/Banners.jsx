import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import HomeInteriors from "../assets/Banners/onamoffer.jpg";
import Mattress from '../assets/Banners/mattress-online.png';
import Herobanner from  '../assets/Banners/Hero-banner.webp';
import SofaBeds from "../assets/Banners/Sofa_Cum_Beds_Slidehsow-min.png";

const Banners = () => {
  return (
    <div className="w-full h-[30vh] sm:h-[40vh] md:h-[60vh] lg:h-[80vh] xl:h-[90vh] mt-4 sm:mt-6 md:mt-10 ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        <SwiperSlide>
          <img
            src={HomeInteriors}
            alt="Home Interiors"
            className="w-full h-full  rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Mattress}
            alt="Mattress"
            className="w-full h-full r rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Herobanner}
            alt="Herobanner"
            className="w-full h-full  rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={SofaBeds}
            alt="Sofa Beds"
            className="w-full h-full  rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banners;
