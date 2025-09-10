import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import { Link } from 'react-router-dom';

const Footer = () => {
  const stylesh = `relative text-sm text-white inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px]
   after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:cursor-pointer`;

  return (
    <div className="w-full">
      <div className="w-full bg-amber-50 flex flex-col md:flex-row justify-around items-center text-center font-serif py-6 gap-6">
       <Link to='/orders' ><div>
          <img className="w-[60px] mx-auto" src="src/assets/Footer/fast-shipping-filled.webp" alt="Fast Shipping" />
          <p className="font-semibold">Your Orders</p>
          <p className="text-sm">48-Hour Dispatch on Selected items</p>
        </div></Link> 
        <div>
          <img className="w-[60px] mx-auto" src="src/assets/Footer/family-owned-operated-filled.webp" alt="Happy Customers" />
          <p className="font-semibold">Happy Customers</p>
          <p className="text-sm">1000+ Happy Customers</p>
        </div>
        <div>
          <img className="w-[60px] mx-auto" src="src/assets/Footer/quality-guaranteed-filled.webp" alt="Quality Guaranteed" />
          <p className="font-semibold">Quality Guaranteed</p>
          <p className="text-sm">For peace of mind</p>
        </div>
      </div>

      <div className="w-full bg-black">
        <div className="flex flex-col md:flex-row justify-around p-6 md:p-10 gap-8 md:gap-0 text-center md:text-left">

          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">    <img
            src="src\assets\logo\Home4u-logo.png"
            alt="Home4U Logo"
            className="h-12 w-auto object-contain rounded-4xl"
          /></li>
            <li className='text-white'>Head Office</li>
            <li className='text-white'>MC Road Kottayam, 686633</li>
            <li className='text-white'>Kalikavu</li>
            <li className={stylesh}>Call us : 1300 228 252</li><br />
            <li className={stylesh}>Email: Home4u@gmail.com</li>
            <div className="flex justify-center md:justify-start gap-3 mt-2">
              <FacebookIcon className='text-white' />
              <InstagramIcon className='text-white' />
              <XIcon className='text-white' />
            </div>
          </ul>

          <ul className="font-serif space-y-2">
           
          <li className="font-semibold text-white">Shop by</li>
           <Link to='/products' > <li className={stylesh}>All</li><br /></Link>
           <Link to='/L=living' > <li className={stylesh}>Living</li><br /></Link>
           <Link to='/dining' > <li className={stylesh}>Dining</li><br /></Link>
           <Link to='/bedroom' > <li className={stylesh}>Bedroom</li><br /></Link>
           <Link to='/Storage' > <li className={stylesh}>Storage</li><br /></Link>
           <Link to='/Homedecor' > <li className={stylesh}>Home Decor</li><br /></Link>
          </ul>

          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">Information</li>
            <li className={stylesh}>Store Location</li><br />
            <li className={stylesh}>About</li><br />
          </ul>

          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">Customer Service</li>
            <li className={stylesh}>Privacy Policy</li><br />
            <li className={stylesh}>Terms and Condition</li><br />
            <li className={stylesh}>Delivery</li><br />
            <li className={stylesh}>Contact Us</li><br />
            <li className={stylesh}>FAQs</li><br />
            <li className={stylesh}>Care and Warranty</li><br />
          </ul>

          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">Download App</li>
           <a href="https://www.apple.com/in/app-store/">
            <li><img className="w-[120px] mx-auto md:mx-0" src="src/assets/Footer/app_store_badge.svg" alt="App Store" /></li></a>
            <a href='https://play.google.com/'> <li><img className="w-[120px] mx-auto md:mx-0" src="src/assets/Footer/google-play-badge.png" alt="Google Play" /></li></a>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
