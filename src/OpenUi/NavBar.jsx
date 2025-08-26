import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const NavBar = () => {
  const [query, setQuery] = useState("");
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const NavStyle =`relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px]
                         after:bg-black after:transition-all after:duration-400 hover:after:w-full hover:cursor-pointer`

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide navbar
        setShowNav(false);
      } else {
        // scrolling up → show navbar
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  return (
    <div>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex flex-wrap justify-between items-center px-6 bg-amber-50 h-16 font-serif rounded-b-lg shadow-md transition-transform duration-300 z-50 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Left Links */}
        <div className="flex space-x-6">
          <div className={NavStyle}>Dummy</div>
          <div className={NavStyle}>Shop All</div>
          <div className={NavStyle}>Living</div>
          <div className={NavStyle}>Dining</div>
          <div className={NavStyle}>Bedroom</div>
          <div className={NavStyle}>Storage</div>
          <div className={NavStyle}>HomeDecor</div>
          <div className={NavStyle}>Alphington outlet</div>
          <div className={NavStyle}>Services</div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-1 rounded-lg outline-none border focus:ring-2 focus:ring-blue-600 mt-2 md:mt-0 w-full md:w-60"
        />

        {/* Right Icons */}
        <div className="flex items-center gap-5 mt-2 md:mt-0">
          <img src="src/assets/Navbar/user.svg" alt="user" className="w-6 h-6" />
          <img src="src/assets/Navbar/cart.svg" alt="cart" className="w-6 h-6" />
          <FavoriteBorderIcon />
        </div>
      </nav>

    </div>
  );
};

export default NavBar;

