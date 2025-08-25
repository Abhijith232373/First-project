import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  const stylesh = `relative text-white inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px]
                         after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:cursor-pointer`;

  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="w-full bg-amber-50 flex flex-col md:flex-row justify-around items-center text-center font-serif py-6 gap-6">
        <div>
          <img className="w-[60px] mx-auto" src="src/assets/fast-shipping-filled.webp" alt="Fast Shipping" />
          <p className="font-semibold">Fast Shipping</p>
          <p className="text-sm">48-Hour Dispatch on Selected items</p>
        </div>
        <div>
          <img className="w-[60px] mx-auto" src="src/assets/family-owned-operated-filled.webp" alt="Happy Customers" />
          <p className="font-semibold">Happy Customers</p>
          <p className="text-sm">1000+ Happy Customers</p>
        </div>
        <div>
          <img className="w-[60px] mx-auto" src="src/assets/quality-guaranteed-filled.webp" alt="Quality Guaranteed" />
          <p className="font-semibold">Quality Guaranteed</p>
          <p className="text-sm">For peace of mind</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-black">
        <div className="flex flex-col md:flex-row justify-around p-6 md:p-10 gap-8 md:gap-0 text-center md:text-left">
          
          {/* Column 1 */}
          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">Dummy name</li>
            <li className='text-white'>Head Office</li>
            <li className='text-white'>MC Road Kottayam, 686633</li>
            <li className='text-white'>Kalikavu</li>
            <li className={stylesh}>Call us : 1300 228 252</li><br />
            <li className={stylesh}>Email: Dummy@gmail.com</li>
            <div className="flex justify-center md:justify-start gap-3 mt-2">
              <FacebookIcon />
              <InstagramIcon />
              <XIcon />
            </div>
          </ul>

          {/* Column 2 */}
          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">Shop by</li>
            <li className={stylesh}>Shop All</li><br />
            <li className={stylesh}>Living</li><br />
            <li className={stylesh}>Dining</li><br />
            <li className={stylesh}>Bedroom</li><br />
            <li className={stylesh}>Storage</li><br />
            <li className={stylesh}>Home Decor</li><br />
            <li className={stylesh}>Alphingation Outlet</li>
          </ul>

          {/* Column 3 */}
          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">Information</li>
            <li className={stylesh}>Store Location</li><br />
            <li className={stylesh}>About</li><br />
          </ul>

          {/* Column 4 */}
          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">Customer Service</li>
            <li className={stylesh}>Privacy Policy</li><br />
            <li className={stylesh}>Terms and Condition</li><br />
            <li className={stylesh}>Delivery</li><br />
            <li className={stylesh}>Contact Us</li><br />
            <li className={stylesh}>FAQs</li><br />
            <li className={stylesh}>Care and Warranty</li><br />
          </ul>

          {/* Column 5 */}
          <ul className="font-serif space-y-2">
            <li className="font-semibold text-white">Download App</li>
            <li><img className="w-[120px] mx-auto md:mx-0" src="src/assets/app_store_badge.svg" alt="App Store" /></li>
            <li><img className="w-[120px] mx-auto md:mx-0" src="src/assets/google-play-badge.png" alt="Google Play" /></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
