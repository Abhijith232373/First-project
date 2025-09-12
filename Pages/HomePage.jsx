import React from 'react'
import NavBar from '../OpenUi/NavBar'
import Footer from '../OpenUi/Footer'
import Banners from '../OpenUi/Banners'
import ItemsBanners from '../OpenUi/ItemsBanners'
import Future from '../OpenUi/Feature'


const Home = () => {
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