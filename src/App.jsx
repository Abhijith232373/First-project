// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Contexts
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { SortProvider } from "./Context/SortContext";
import { ProductFilterProvider } from "./Context/ProductFilterContext";
import { SearchProvider } from "./Context/SearchContext";

// Pages / Components
import HomePage from './Pages/HomePage';
import Login from './User/Login';
import SignUp from "./User/SignUp";
import Products from "./Components/Products";
import Dining from "./Components/Dining";
import Living from "./Components/Living";
import Storage from "./Components/Storage";
import WishlistPage from './Pages/WishlistPage';
import Cart from './Pages/Cart';
import Bedroom from "./Components/BedRoom";
import HomeDecor from "./Components/HomeDecor";
import Kitchen from "./Components/Kitchen";
import BuyDetails from "./Pages/BuyDetails";
import Orders from "./Pages/Orders";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SortProvider>
            <ProductFilterProvider>
              <SearchProvider>
                <Toaster position="top-right" reverseOrder={false} />


                <Routes>


                  <Route path='/' element={<HomePage />} />
                  <Route path='/user' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/products' element={<Products />} />
                  <Route path='/dining' element={<Dining />} />
                  <Route path='/living' element={<Living />} />
                  <Route path='/bedroom' element={<Bedroom/>} />
                  <Route path='/Storage' element={<Storage />} />
                  <Route path='/Homedecor' element={<HomeDecor/>} />
                  <Route path='/Kitchen' element={<Kitchen/>} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/buydetails" element={<BuyDetails />} />
                  <Route path="/orders" element={<Orders/>}/>

                </Routes>
              </SearchProvider>
            </ProductFilterProvider>
          </SortProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
