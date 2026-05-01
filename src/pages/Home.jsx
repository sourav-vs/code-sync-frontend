import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { MdSyncAlt } from "react-icons/md";

function Home() {
  return (
    <>
    <Header/>
      <div className='flex flex-col items-center justify-center mt-5 pt-5'>
        <h1 className='text-lg'>ENGINEERED FOR FLOW STATE</h1>
        <h1 className='text-6xl mt-2'>Code Together in <span className='text-gray-500'>Real-Time</span></h1>
        <h1 className='mt-2 text-lg'>The ultimate collaborative playground for developers.Sync,preview,and deploy in one immersive workspace</h1>

        <div className='mt-5 pt-5 text-center p-8 rounded shadow-md'>
          <input type="text" placeholder='Enter room id' className='w-80 rounded bg-gray-300 p-3 my-2' /><br />
          <div className='flex justify-center gap-3'>
             <Link to={'/workspace'}>
                <button className='btn border px-2 py-2 rounded-md text-white bg-black'>Enter WorkSpace</button>
              </Link>
              <button className='btn border px-2 py-2 rounded-md text-white bg-black'>Create Room</button>
          </div>
        </div>

        <div className='grid grid-cols-3'>
          <div>
            <MdSyncAlt />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home