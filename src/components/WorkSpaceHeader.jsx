import React, { useState } from 'react'
import { FaRegCopy } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { HiShare } from "react-icons/hi";
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { toast, ToastContainer, Bounce } from 'react-toastify';



function WorkSpaceHeader({ onlineUsers }) {

    const navigate = useNavigate()
    const username = localStorage.getItem("username")
    const { roomId } = useParams()
    const [dropDown, setDropDown] = useState(false)

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }
    const handleCopyRoomId = async () => {
        await navigator.clipboard.writeText(roomId)
        toast.success("Room ID copied", {
            containerId: "center-toast"
        })
    }
    const handleShare = async () => {

        const roomLink =
            `${window.location.origin}/workspace/${roomId}`

        await navigator.clipboard.writeText(roomLink)
        toast.success("Link copied to clipboard")

    }

    return (
        <>
            <div className='flex flex-col md:flex-row items-center justify-between w-full rounded shadow px-4 py-2 gap-3'>
                <div className='flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto'>
                    <img src="/IDE-LOGO.png" alt="" width={'200px'} height={'50px'} />
                    <div className='flex items-center gap-3 p-2 rounded-md shadow-md bg-gray-300 max-w-full overflow-hidden'>
                        <p className='text-xs text-gray-600'>ROOM ID</p>
                        <p className='truncate max-w-[180px]'>{roomId}</p>
                        <FaRegCopy onClick={handleCopyRoomId} className='text-xs text-gray-600' />
                    </div>
                </div>
                <div className='relative flex flex-wrap items-center gap-4 px-5'>

                    <h1>
                        🟢 {onlineUsers.length} Online
                    </h1>

                    <button onClick={() => setDropDown(!dropDown)}>
                        {
                            username ?
                                <div className='flex items-center gap-2'>

                                    <div className='hidden w-10 h-10 rounded-full bg-black text-white md:flex items-center justify-center font-bold text-lg'>
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
                    {
                        dropDown &&
                        <div className='absolute top-11 right-40 bg-black hover:bg-red-800 hover:text-white shadow-lg rounded-md w-fit p-2 z-50'>
                            <button onClick={handleLogout} className='flex items-center gap-2 px-2 py-1 rounded text-white text-center'>Logout<MdOutlineLogout /></button>
                        </div>
                    }


                    <div className='flex items-center'>
                        <button onClick={handleShare} className='flex items-center gap-2 px-4 py-2 rounded-md text-white bg-black'>
                            <HiShare className='text-sm' />
                            Share
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
                containerId="center-toast"
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    )
}

export default WorkSpaceHeader