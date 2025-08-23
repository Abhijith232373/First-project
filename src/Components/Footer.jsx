import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
    const stylesh = `relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px]
                         after:bg-black after:transition-all after:duration-300 hover:after:w-full  hover:cursor-pointer`;
    return (
        <div>
            <div className='w-[100vw] h-36 bg-blue-100  flex justify-around font-serif'>
                <div><img className='w-[60px]' src="src\assets\fast-shipping-filled.webp" alt="img" />
                    <p className=''>Fast Shipping</p>
                    <p>48-Hour Dispatch on Selected items</p>
                </div>
                <div><img className='w-[60px]' src="src\assets\family-owned-operated-filled.webp" alt="img" />
                    <p>Happy Customers</p>
                    <p>1000+ Happy Customers</p>
                </div>
                <div><img className='w-[60px]' src="src\assets\quality-guaranteed-filled.webp" alt="img" />
                    <p>Guality Quaranteed</p>
                    <p>for peace of mind</p>
                </div>
            </div>
            <div className='w-[100vw] h-58  bg-blue-300 '>
                <div className='flex justify-around p-5'>
                    <ul className='font-serif'>
                        <li className='  font-semibold text--ms '>Dummy name</li>
                        <li className=''>Heaad office</li>
                        <li className=''>mc Road kottayam, 686633</li>
                        <li className=''>kalikavu</li>
                        <li className={stylesh}>Call us : 1300 228 252</li><br />
                        <li className={stylesh}>Email: Dummy@gmail.com</li><br />
                        <div>
                            <FacebookIcon />
                            <InstagramIcon />
                            <XIcon />
                        </div>
                    </ul>
                    <ul className='font-serif'>
                        <li className=' font-serif font-semibold text--ms ' >Shop by</li>
                        <li className={stylesh}>Shop All</li><br />
                        <li className={stylesh}>Living</li><br />
                        <li className={stylesh}>Dining</li><br />
                        <li className={stylesh}>Bedroom</li><br />
                        <li className={stylesh}>Storage</li><br />
                        <li className={stylesh}>Home Decor</li><br />
                        <li className={stylesh}>Alphingation Outlet</li>
                    </ul>
                    <ul className='font-serif'>
                        <li className=' font-serif font-semibold text--ms '>Information</li>
                        <li className={stylesh}>Store Location</li><br />
                        <li className={stylesh}>About</li><br />
                    </ul>
                    <ul className='font-serif'>
                        <li className=' font-serif font-semibold text--ms '>Customer Service</li>
                        <li className={stylesh}>Privacy Policy</li><br />
                        <li className={stylesh}>Terms and Condition</li><br />
                        <li className={stylesh}>Delivery</li><br />
                        <li className={stylesh}>Contact Us</li><br />
                        <li className={stylesh}>FAQs</li><br />
                        <li className={stylesh}>Care  and Warrandty</li><br />
                    </ul>
                    <ul className='font-serif'>
                        <li className=' font-serif font-semibold text--ms '>Download App</li>
                        <li><img className='w-[100px]' src="src\assets\app_store_badge.svg" alt="" /></li>
                        <li><img className='w-[100px]' src="src\assets\google-play-badge.png" alt="" /></li>
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default Footer