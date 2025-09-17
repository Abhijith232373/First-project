import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/LoginContext";
import { WishlistContext } from "../Context/WishlistContext";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const NavBar = () => {
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const NavStyle = (path) =>
    `relative inline-block px-2 py-1 text-[15px] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
     after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full hover:text-gray-600 hover:cursor-pointer ${
       location.pathname === path
         ? "text-gray-600 font-semibold after:w-full"
         : "text-gray-700"
     }`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNav(false);
      else setShowNav(true);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    toast.error("Logged out");
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center px-4 sm:px-6 bg-white h-16 shadow-md transition-transform duration-300 z-50 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="block md:hidden">
          <IconButton onClick={() => setOpenMenu(true)}>
            <MenuIcon className="text-gray-600" />
          </IconButton>
        </div>

        <Link to="/" className="hidden md:block">
          <img
            src="src/assets/logo/logo.png"
            alt="Home4U Logo"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/products">
            <div className={NavStyle("/products")}>SHOP ALL</div>
          </Link>
          <Link to="/living">
            <div className={NavStyle("/living")}>LIVING</div>
          </Link>
          <Link to="/dining">
            <div className={NavStyle("/dining")}>DINING</div>
          </Link>
          <Link to="/bedroom">
            <div className={NavStyle("/bedroom")}>BEDROOM</div>
          </Link>
          <Link to="/storage">
            <div className={NavStyle("/storage")}>STORAGE</div>
          </Link>
          <Link to="/homedecor">
            <div className={NavStyle("/homedecor")}>HOME DECOR</div>
          </Link>
          <Link to="/kitchen">
            <div className={NavStyle("/kitchen")}>KITCHEN</div>
          </Link>
        </div>
      </div>

      
      <div className="flex-1 flex justify-center px-2">
        <SearchBar />
      </div>

      <div className="hidden md:flex items-center gap-5">
        <Link to="/cart" className="relative">
          <ShoppingCartIcon className="text-gray-600 w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>

        <Link to="/wishlist" className="relative">
          <FavoriteIcon className="text-gray-600 w-6 h-6" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {wishlist.length}
            </span>
          )}
        </Link>

        <Link to="/orders">
          <LocalMallIcon className="text-gray-600 w-6 h-6" />
        </Link>

        {!isLoggedIn && (
          <Link to="/user" className="text-gray-700 font-medium hover:text-gray-600">
            <AccountCircleIcon/>
          </Link>
        )}

        {isLoggedIn && (
          <LogoutIcon
            onClick={handleLogout}
            className="cursor-pointer text-gray-600 w-6 h-6"
          />
        )}
      </div>

      <Drawer anchor="left" open={openMenu} onClose={() => setOpenMenu(false)}>
        <div className="w-64 p-4 space-y-4">
          <h2 className="text-lg font-bold text-gray-700">Categories</h2>
          <List>
            <Link to="/products" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Shop All" />
              </ListItem>
            </Link>
            <Link to="/living" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Living" />
              </ListItem>
            </Link>
            <Link to="/dining" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Dining" />
              </ListItem>
            </Link>
            <Link to="/bedroom" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Bedroom" />
              </ListItem>
            </Link>
            <Link to="/storage" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Storage" />
              </ListItem>
            </Link>
            <Link to="/homedecor" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Home Decor" />
              </ListItem>
            </Link>
            <Link to="/kitchen" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Kitchen" />
              </ListItem>
            </Link>
          </List>

          <h2 className="text-lg font-bold text-gray-700 mt-4">Your Account</h2>
          <List>
            <Link to="/cart" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Your Cart" />
              </ListItem>
            </Link>
            <Link to="/wishlist" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Your Wishlist" />
              </ListItem>
            </Link>
            <Link to="/orders" onClick={() => setOpenMenu(false)}>
              <ListItem button>
                <ListItemText primary="Your Orders" />
              </ListItem>
            </Link>
            {!isLoggedIn && (
              <Link to="/user" onClick={() => setOpenMenu(false)}>
                <ListItem button>
                  <ListItemText primary="Login" />
                </ListItem>
              </Link>
            )}
            {isLoggedIn && (
              <ListItem
                button
                onClick={() => {
                  handleLogout();
                  setOpenMenu(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default NavBar;
