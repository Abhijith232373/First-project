import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Future = () => {
  const items = [
    { id: 1, img: "src/assets/Feature/dining-1.webp" },
    { id: 2, img: "src/assets/Feature/Entertainment-2.webp" },
    { id: 3, img: "src/assets/Feature/sofa-3.jpg" },
    { id: 4, img: "src/assets/Feature/table-4.jpg" },
    { id: 5, img: "src/assets/Feature/table-5.jpg" },
    { id: 6, img: "src/assets/Feature/chair-6.webp" },
    { id: 7, img: "src/assets/Feature/table-7.webp" },
  ];

  return (
    <div className="relative w-full py-10 sm:py-16 md:py-20 overflow-hidden">
      {/* Title */}
      <h1 className="flex justify-center font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl pb-6 md:pb-10 text-center">
        FEATURED PRODUCTS
      </h1>

      {/* Custom navigation buttons */}
      <div className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 z-20">
        <button className="swiper-button-prev rounded-full p-1 sm:p-2 bg-white shadow-md">
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>
      </div>
      <div className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 z-20">
        <button className="swiper-button-next rounded-full p-1 sm:p-2 bg-white shadow-md">
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={16}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1.1 },   // Mobile
          480: { slidesPerView: 1.5 },   // Small mobiles landscape
          640: { slidesPerView: 2 },     // Tablets
          768: { slidesPerView: 2.5 },   // Small laptops
          1024: { slidesPerView: 3.5 },  // Desktop
          1280: { slidesPerView: 4.2 },  // Large Desktop
        }}
        className="w-full px-4 sm:px-6 md:px-10"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative rounded-xl overflow-hidden hover:shadow-xl transition duration-300 group bg-white">
              {/* SALE tag */}
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md shadow-md z-10">
                SALE
              </div>

              {/* Product Image */}
              <img
                src={item.img}
                alt={`item-${item.id}`}
                className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />

              {/* Button */}
              <div className="flex justify-center py-2 sm:py-3">
                <a
                  href="/products"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition duration-300"
                >
                  Explore Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Future;
