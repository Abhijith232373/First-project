import React from 'react'

const NavBar = () => {
  return (
    <div >
        <div className='flex list-none space justify-around bg-blue-400 h-16 items-center font-serif rounded-b-lg'>
            <div>Home</div>
            <div>about</div>
            <div>cart</div>
            <div>login</div>
            <div className='flex '>
            <div className='mr-10'><img src="src\assets\cart.svg" alt="" /></div>
            <div><img src="src\assets\user.svg" alt="" /></div>
            </div>
        </div>
    </div>
  )
}

export default NavBar