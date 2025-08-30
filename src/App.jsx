import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./Pages/AuthContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { SortProvider } from "./Context/SortContext";
import { ProductFilterProvider } from "./Context/ProductFilterContext";
import {SearchProvider} from './Context/SearchContext'


import HomePage from './Pages/HomePage'
import Login from './User/Login'
import SignUp from "./User/SignUp"
import Products from "./Pages/Products"
import Dining from "./Pages/Dining"
import Living from "./Pages/Living"
import Storage from "./Pages/Storage"
import WishlistPage from './Pages/WishlistPage'
import Cart from './Pages/Cart'
function App() {

  return (
    <>
      <AuthProvider>
        <WishlistProvider>
          <SortProvider>
            <ProductFilterProvider>
              <SearchProvider>

                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/user' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/products' element={<Products />} />
                  <Route path='/dining' element={<Dining />} />
                  <Route path='/living' element={<Living />} />
                  <Route path='/Storage' element={<Storage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<Cart />} />

                </Routes>


              </SearchProvider>
            </ProductFilterProvider>
          </SortProvider>
        </WishlistProvider>
      </AuthProvider>
    </>
  )
}

export default App