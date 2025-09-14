import {Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/LoginContext";
import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { SortProvider } from "./Context/SortContext";
import { ProductFilterProvider } from "./Context/ProductFilterContext";
import { SearchProvider } from "./Context/SearchContext";
import { OrderProvider } from "./Context/OrderContext";
import ProtectedRoute from "./Protecters/ProtectedRoute";
import PublicRoute from "./Protecters/PublicRoute";
import HomePage from "./Pages/HomePage";
import Login from "./Account/Login";
import SignUp from "./Account/SignUp";
import Products from "./Catagorys/Products";
import Dining from "./Catagorys/Dining";
import Living from "./Catagorys/Living";
import Storage from "./Catagorys/Storage";
import WishlistPage from "./Pages/WishlistPage";
import Cart from "./Pages/Cart";
import Bedroom from "./Catagorys/BedRoom";
import HomeDecor from "./Catagorys/HomeDecor";
import Kitchen from "./Catagorys/Kitchen";
import BuyDetails from "./Pages/BuyDetails";
import Orders from "./Pages/Orders";
import CategoryPage from "./Pages/CategoryPage";
import ProductDetails from "./Pages/ProductDetails";
import ScrollToTop from "./Animations/ScrollToTop";
import AdminPage from "./Admin/ProductAccess";
import AccessUser from "./Admin/AccessUser";
import AdminSidebar from "./Admin/AdminSidebar";
import AdminLayout from "./Admin/AdminLayout";
import ProductAccess from './Admin/ProductAccess'
import AdminDashboard from "./Admin/AdminDashboard";
import { Navigate } from "react-router-dom";
``


function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <SortProvider>
              <ProductFilterProvider>
                <OrderProvider>
                  <Toaster position="top-right" reverseOrder={false} />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user" element={ <PublicRoute><Login /> </PublicRoute> } />
                    <Route  path="/signup"  element={  <PublicRoute> <SignUp /> </PublicRoute> }/>
                    <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>}/>
                    <Route path="/cart"element={<ProtectedRoute><Cart /></ProtectedRoute> }/>
                    <Route path="/buydetails" element={ <ProtectedRoute> <BuyDetails /> </ProtectedRoute>}/>
                    <Route path="/orders"element={<ProtectedRoute><Orders /> </ProtectedRoute>}/>
                     <Route path="/product/:id" element={<ProductDetails/>} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/dining" element={<Dining />} />
                    <Route path="/living" element={<Living />} />
                    <Route path="/bedroom" element={<Bedroom />} />
                    <Route path="/storage" element={<Storage />} />
                    <Route path="/homedecor" element={<HomeDecor />} />
                    <Route path="/kitchen" element={<Kitchen />} />
                    <Route path="/category/:category" element={<CategoryPage />} />



                  {/* <Route path="/adm" element={<AdminPage />} /> */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="adminusers" element={<AccessUser />} />
  <Route path="ProductAccess" element={<ProductAccess />} />
  <Route path="dashboard" element={<AdminDashboard/>}/>
</Route>
                   {/* <Route path="/ad" element={<AdminSidebar />}></Route> */}






                  </Routes>
      <ScrollToTop/>
                    
                </OrderProvider>
              </ProductFilterProvider>
            </SortProvider>
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
