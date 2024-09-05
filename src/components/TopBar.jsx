import React from 'react';
import Logo from '../assets/icons/Group 1000002532.svg'

const TopBar = () => {
  return (
    <div className=' w-full h-[10%] bg-white text-black flex items-center'>
          <a href='/'><img src={Logo} alt='logo' className=' h-50 w-50 pl-24' /></a>
    </div>
  )
}

export default TopBar