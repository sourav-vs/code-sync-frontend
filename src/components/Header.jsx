import React, { useState } from 'react'
import { BsBellFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { TbLogin } from "react-icons/tb";

function Header() {

  const [dropDown, setDropDown] = useState(false)
  const navigate = useNavigate()
  const username = localStorage.getItem("username")
  const [user,setUser]=useState(localStorage.getItem("username"))

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <>
      <div className='flex items-center justify-between w-full rounded shadow px-4 py-2'>
        <div className='flex flex-block items-center gap-2'>
          <img src="IDE-LOGO.png" alt="" width={'200px'} height={'50px'} />
          <h1 className='text-lg  px-2 py-1 rounded-md shadow hover:bg-black hover:text-white'>Dashboard</h1>
          <h1 className='text-lg  px-2 py-1 rounded-md shadow hover:bg-black hover:text-white'>Rooms</h1>
          <h1 className='text-lg  px-2 py-1 rounded-md shadow hover:bg-black hover:text-white'>Documentation</h1>
          <h1 className='text-lg  px-2 py-1 rounded-md shadow hover:bg-black hover:text-white'>Terminal</h1>
        </div>
        <div className='relative flex flex-block items-center gap-4 px-5'>
          <BsBellFill className='black' />
          <IoSettings />
          <button className='btn border px-2 py-2 rounded-md text-white bg-black'>Create Room</button>

          <button onClick={() => setDropDown(!dropDown)}>
            {
              username ?
                <div className='flex items-center gap-2'>

                  <div className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg'>
                    {username?.charAt(0).toUpperCase()}
                  </div>

                  <h1 className='font-semibold'>
                    {username}
                  </h1>

                </div>
                :
                <img src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png" alt="" height={'40px'} width={'40px'} style={{ borderRadius: '50%' }} />
            }
          </button>

        </div>
        {
          dropDown &&
          
          <div className='absolute top-14 right-0 bg-black hover:bg-red-800 hover:text-white shadow-lg rounded-md w-fit p-2 z-50'>
            {
              username?
              <button onClick={handleLogout} className='flex items-center gap-2 px-2 py-1 rounded text-white text-center'>Logout<MdOutlineLogout /></button>
              :
              <button onClick={()=>navigate('/auth')} className='flex items-center gap-2 px-2 py-1 rounded text-white text-center'>Login<TbLogin /></button>
            }
          </div>
        }
      </div>
    </>
  )
}

export default Header