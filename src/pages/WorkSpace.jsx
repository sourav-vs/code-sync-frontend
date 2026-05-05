import React, { useState } from 'react'
import WorkSpaceHeader from '../components/WorkSpaceHeader'
import { FaEye } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { GoShare } from "react-icons/go";

function WorkSpace() {
  const [activeTab, setActiveTab] = useState("html")

  return (
    <>
      <WorkSpaceHeader />

      <div className='grid grid-cols-5'>
        <div className="col-span-3 min-h-[calc(100vh-60px)] text-black p-4">

          {/* Tabs */}
          <div className="flex gap-4 border-gray-700 mb-3">
            <button
              onClick={() => setActiveTab("html")}
              className={`pb-2 ${activeTab === "html"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400"
                }`}
            >
              HTML
            </button>

            <button
              onClick={() => setActiveTab("css")}
              className={`pb-2 ${activeTab === "css"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400"
                }`}
            >
              CSS
            </button>

            <button
              onClick={() => setActiveTab("js")}
              className={`pb-2 ${activeTab === "js"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400"
                }`}
            >
              JS
            </button>
          </div>

          {/* Editor */}
          <div className="h-[80%]">
            <textarea
              className="w-full h-full border border-gray-700 shadow-md rounded-md p-4 text-sm outline-none focus:ring-2 focus:ring-gray-600"
              placeholder={
                activeTab === "html"
                  ? "Write HTML here..."
                  : activeTab === "css"
                    ? "Write CSS here..."
                    : "Write JavaScript here..."
              }
            />
          </div>

        </div>
        <div className='col-span-2'>
  <div className='flex items-center justify-between p-4 border-gray-700'>
    <div className='flex items-center gap-3 text-gray-600'>
      <FaEye />
      <h1>Live Preview</h1>
    </div>

    <div className='flex items-center gap-3 text-gray-400'>
      <TbReload className="cursor-pointer hover:text-black" />
      <GoShare className="cursor-pointer hover:text-black" />
    </div>
  </div>

  <div className='h-[80vh] mx-3 mt-1 border border-gray-700 rounded-md flex items-center justify-center bg-[#161b22]'>
    <p className="text-gray-400">Live Preview Output</p>
  </div>
</div>
      </div>
    </>
  )
}

export default WorkSpace