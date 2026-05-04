import React from 'react'
import { FaRegCopy } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { HiShare } from "react-icons/hi";

function WorkSpaceHeader() {
    return (
        <>
            <div className='flex items-center justify-between w-full rounded shadow px-4 py-2'>
                <div className='flex items-center gap-2'>
                    <img src="IDE-LOGO.png" alt="" width={'200px'} height={'50px'} />
                    <div className='flex items-center gap-3 p-2 rounded-md shadow-md bg-gray-300'>
                        <p className='text-xs text-gray-600'>ROOM ID</p>
                        <p>ALPHA-DELTA-369</p>
                        <FaRegCopy className='text-xs text-gray-600' />
                    </div>
                </div>
                <div className='flex flex-block items-center gap-4 px-5'>
                    <img src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png" alt="" height={'40px'} width={'40px'} style={{ borderRadius: '50%' }} />
                    <BsBellFill className='black' />
                    <IoSettings />
                    <div className='flex items-center'>
                        <button className='flex items-center gap-2 px-4 py-2 rounded-md text-white bg-black'>
                            <HiShare className='text-sm' />
                            Share
                        </button>
                    </div>
                </div>
            </div>
              <div className='grid grid-cols-2'>
                    <div className=''>
                        <h1>html</h1>
                    </div>
                </div>
        </>
    )
}

export default WorkSpaceHeader