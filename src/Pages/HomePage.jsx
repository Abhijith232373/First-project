import React from 'react'
import NavBar from '../OpenUi/NavBar'
import Footer from '../OpenUi/Footer'
import Banners from '../OpenUi/Banners'
import ItemsBanners from '../OpenUi/ItemsBanners'
import Future from '../OpenUi/Feature'
import { useAuth } from "../Context/LoginContext";
import { Navigate } from 'react-router-dom'

const Home = () => {
    const { user } = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return (
    <div>
      
        <NavBar/>
        <Banners/>
        <ItemsBanners/>
        <Future/>
        <Footer/>
    </div>
  )
}


export default Home