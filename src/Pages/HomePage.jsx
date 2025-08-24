import React from 'react'
import NavBar from '../OpenUi/NavBar'
import Footer from '../OpenUi/Footer'
import Banners from '../OpenUi/Banners'
import ItemsBanners from '../OpenUi/ItemsBanners'


const Home = () => {
  return (
    <div>
        <NavBar/>
        <Banners/>
        <ItemsBanners/>
        <Footer/>
    </div>
  )
}

export default Home