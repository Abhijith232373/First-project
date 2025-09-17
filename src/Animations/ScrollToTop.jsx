import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8  bg-gray-600 text-white p-2 sm:p-3 md:p-4 
                   rounded-full shadow-lg hover:bg-gray-700  transition ease-in-out hover:scale-105 cursor-pointer z-50"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>
    )
  );
};

export default ScrollToTop;
