import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const NavBar = () => {
  const [query, setQuery] = useState("");
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        className={`fixed top-0 left-0 w-full flex flex-wrap justify-between items-center px-6 bg-blue-100 h-16 font-serif rounded-b-lg shadow-md transition-transform duration-300 z-50 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Left Links */}
        <div className="flex space-x-6">
          <div className="hover:cursor-pointer">Home</div>
          <div className="hover:cursor-pointer">About</div>
          <div className="hover:cursor-pointer">Cart</div>
          <div className="hover:cursor-pointer">Login</div>
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
          <img src="src/assets/user.svg" alt="user" className="w-6 h-6" />
          <img src="src/assets/cart.svg" alt="cart" className="w-6 h-6" />
          <FavoriteBorderIcon />
        </div>
      </nav>

    </div>
  );
};

export default NavBar;

