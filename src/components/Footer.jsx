import React from 'react'

function Footer() {
  return (
    <>
    <div className='grid grid-cols-3 gap-3 bg-black'>
        <div className='px-8 py-14'>
            <img src="ide-logo-2.png" alt="" width={'250px'} height={'100px'} />
            <p className='text-white my-1 mx-5'>The precision tool for the modern elite developer.</p>
        </div>
        <div className='flex items-center gap-6 mx-15'>
            <div>
                <h1 className='my-1 text-white'>Product</h1>
                <p className='text-gray-700 hover:text-white'>Features</p>
                <p className='text-gray-700 hover:text-white'>Security</p>
                <p className='text-gray-700 hover:text-white'>Enterprise</p>
            </div>
            <div>
                <h1 className='my-1 text-white'>Social</h1>
                <p className='text-gray-700 hover:text-white'>Twitter</p>
                <p className='text-gray-700 hover:text-white'>Github</p>
                <p className='text-gray-700 hover:text-white'>Discord</p>
            </div>
        </div>
        <div>
            <p className='text-gray-700 mx-8 mt-20'>© 2026 Code Sync Technologies. All rights reserved</p>
        </div>
    </div>
    </>
  )
}

export default Footer