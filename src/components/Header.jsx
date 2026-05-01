import React from 'react'
import { BsBellFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";

function Header() {
  return (
    <>
    <div className='flex items-center justify-between w-full border px-4 py-2'>
        <div className='flex flex-block items-center gap-2'>
            <img src="IDE-LOGO.png" alt="" width={'200px'} height={'50px'} />
            <h1 className='text-lg  px-2 py-1 rounded-md shadow hover:bg-black hover:text-white'>Dashboard</h1>
            <h1 className='text-lg  px-2 py-1 rounded-md shadow hover:bg-black hover:text-white'>Rooms</h1>
            <h1 className='text-lg  px-2 py-1 rounded-md shadow hover:bg-black hover:text-white'>Documentation</h1>
            <h1 className='text-lg  px-2 py-1 rounded-md shadow hover:bg-black hover:text-white'>Terminal</h1>
        </div>
        <div className='flex flex-block items-center gap-4 px-5'>
            <BsBellFill className='black' />
            <IoSettings />
            <button className='btn border px-2 py-2 rounded-md text-white bg-black'>Create Room</button>
            <img src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png" alt="" height={'40px'} width={'40px'} style={{borderRadius:'50%'}} />
        </div>
    </div>
    </>
  )
}

export default Header