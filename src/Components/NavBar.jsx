import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const NavBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <nav className="flex justify-around bg-blue-100 h-16 items-center font-serif rounded-b-lg ">
        <div>Home</div>
        <div>About</div> 
        <div>Cart</div>
        <div>Login</div>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-1 rounded-lg outline-none border focus:ring-2 focus:ring-blue-600"
        />

        <div className="flex items-center space-x-4 gap-5">
          <img src="src/assets/user.svg" alt="user" className="w-6 h-6" />
          <img src="src/assets/cart.svg" alt="cart" className="w-6 h-6" />
        <FavoriteBorderIcon/> 
        </div>
      </nav>
      <div className="p-10"  > 
        <button className="hover:cursor-pointer border-2 py-2 px-7 font-serif absolute bg-gray-300 rounded-3xl hover:scale-105 mx-[600px] my-[350px]" >Shop Now</button>
        <img className="rounded-2xl" src="src\assets\interior2.jpg" alt="home"/>
        </div>
    </div>
  );
};

export default NavBar;
