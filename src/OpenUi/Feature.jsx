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
    <div className="relative w-full py-20 overflow-hidden">
      <h1 className="flex justify-center font-serif text-4xl pb-10">
        FEATURED PRODUCTS
      </h1>

      <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-20">
        <button className="swiper-button-prev rounded-full p-2 bg-white shadow-md">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
        <button className="swiper-button-next rounded-full p-2 bg-white shadow-md">
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <Swiper modules={[Autoplay, Navigation]}
        spaceBetween={20}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 }, 
          1024: { slidesPerView: 3.5 }, 
          1280: { slidesPerView: 4.5 }, 
        }}
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative rounded-xl overflow-hidden hover:shadow-xl transition duration-300 group bg-white">
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
                SALE
              </div>

              <img
                src={item.img}
                alt={`item-${item.id}`}
                className="w-full h-[250px] md:h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />

              <div className="flex justify-center py-3">
               <a href='/products'
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition duration-300"
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
    