import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { MdSyncAlt } from "react-icons/md";
import { TbLivePhoto } from "react-icons/tb";
import { IoIosChatboxes } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8)

    // navigate(`/workspace/${roomId}`)
  }

  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center mt-5 pt-5'>
        <h1 className='text-lg'>ENGINEERED FOR FLOW STATE</h1>
        <h1 className='text-6xl mt-2'>Code Together in <span className='text-gray-500'>Real-Time</span></h1>
        <h1 className='mt-2 text-lg'>The ultimate collaborative playground for developers.Sync,preview,and deploy in one immersive workspace</h1>

        <div className='mt-5 pt-5 text-center p-8 rounded shadow-md'>
          <input type="text" placeholder='Enter room id' className='w-80 rounded bg-gray-300 p-3 my-2' /><br />
          <div className='flex justify-center gap-3'>
            <Link to={'/auth'}>
              <button className='btn border px-2 py-2 rounded-md text-white bg-black'>Enter WorkSpace</button>
            </Link>
            <button onClick={createRoom} className='btn border px-2 py-2 rounded-md text-white bg-black'>Create Room</button>
          </div>
        </div>

        <div className='grid grid-cols-3 mt-5 pt-5 gap-5'>
          <div className='w-100 p-5 rounded-md shadow-md'>
            <MdSyncAlt className='m-1 p-1 text-3xl bg-black text-white rounded-md shadow-md' />
            <h1 className='font-bold '>Real-time sync</h1>
            <p className='my-1'>Experience zero-latency code synchronization across teams with our custom engine</p>
          </div>
          <div className='w-100 p-5 rounded-md shadow-md'>
            <TbLivePhoto className='m-1 p-1 text-3xl bg-black text-white rounded-md shadow-md' />
            <h1 className='font-bold my-1'>Live preview</h1>
            <p className='my-1 '>Instant browser updates as you type.See the impact of your code changes immediately</p>
          </div>
          <div className='w-100 p-5 rounded-md shadow-md'>
            <IoIosChatboxes className='m-1 p-1 text-3xl bg-black text-white rounded-md shadow-md' />
            <h1 className='font-bold my-1'>Integrated chat</h1>
            <p className='my-1 '>Context-aware discussions directly in the IDE.Comment on lines or global threads</p>
          </div>
        </div>

        <div className='grid grid-cols-2 mt-5 pt-5 gap-5'>
          <div className='px-5 mx-5'>
            <h1 className='my-2'>The Terminal of the Future</h1>
            <p>Designed for teams who refuse to settle for subpar collaboration.High-fidelity cursors, state-driven syncing, and enterprise security baked into the core</p>
            <div className='flex items-center mt-4 gap-2'>
              <IoIosCheckmarkCircle className='font-bold text-2xl' />
              <div>
                <p className='font-bold'>End-to-End Encryption</p>
                <p>Your intellectual property stays yours,always</p>
              </div>
            </div>
            <div className='flex items-center mt-4 gap-2'>
              <IoIosCheckmarkCircle className='font-bold text-2xl' />
              <div>
                <p className='font-bold'>Multi-cursor Support</p>
                <p>Infinite collaborations without performance drop.</p>
              </div>
            </div>
          </div>

          <div className='p-5'>
            <img src="code.png" alt="" style={{ borderRadius: '20px' }} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home