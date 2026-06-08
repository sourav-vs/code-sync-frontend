import React, { useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getReplayFramesAPI } from "../services/allAPI";




function SessionReplay() {

  const [activeTab, setActiveTab] = useState("html");
  const { roomId } = useParams()

  const [frames, setFrames] = useState([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [currentCode, setCurrentCode] = useState({ html: "", css: "", js: "" })

  const getFrames = async () => {
    try {
      const result = await getReplayFramesAPI(roomId)
      console.log(result);
      setFrames(result.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFrames()
  }, [])

  useEffect(() => {
    if (frames.length === 0) return
    setCurrentCode({
      html: frames[currentFrame]?.html || "",
      css: frames[currentFrame]?.css || "",
      js: frames[currentFrame]?.js || ""
    })
  }, [frames, currentFrame])

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* HEADER */}

      <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center mb-5">

        <div>

          <div className="flex items-center gap-4">

            <h1 className="text-4xl font-bold">

              🎬 Session Replay

            </h1>

            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

              ● Replay Ready

            </div>

          </div>

          <p className="text-gray-500 mt-2">

            Room ID : 5bb3ee66

          </p>

        </div>


        <div className="flex gap-3">

          <div className="bg-gray-100 px-5 py-3 rounded-xl">
            2 Users
          </div>

          <div className="bg-gray-100 px-5 py-3 rounded-xl">
            47 Frames
          </div>

          <div className="bg-gray-100 px-5 py-3 rounded-xl">
            3m 42s
          </div>

        </div>

      </div>



      {/* MAIN GRID */}

      <div className="grid grid-cols-12 gap-5">

        {/* LEFT SIDE */}

        <div className="col-span-8">

          {/* Language Tabs */}

          <div className="bg-white rounded-xl shadow-md p-3 flex gap-3 mb-5">

            <button
              onClick={() => setActiveTab("html")}
              className={`px-5 py-2 rounded-lg transition
                            ${activeTab === "html"
                  ? "bg-black text-white"
                  : "bg-gray-100"
                }`}
            >
              HTML
            </button>

            <button
              onClick={() => setActiveTab("css")}
              className={`px-5 py-2 rounded-lg transition
                            ${activeTab === "css"
                  ? "bg-black text-white"
                  : "bg-gray-100"
                }`}
            >
              CSS
            </button>

            <button
              onClick={() => setActiveTab("js")}
              className={`px-5 py-2 rounded-lg transition
                            ${activeTab === "js"
                  ? "bg-black text-white"
                  : "bg-gray-100"
                }`}
            >
              JavaScript
            </button>

          </div>


          {/* Frame Controls */}

          <div className="bg-white rounded-xl shadow-md p-3 flex items-center justify-between mb-5">

            <div className="flex gap-3">

              <button
                className="
            px-5 py-3
            bg-gray-100
            rounded-xl
            hover:bg-gray-200
            transition
            " onClick={() => {
                  if (currentFrame > 0) {
                    setCurrentFrame(prev => prev - 1)
                  }
                }}
              >
                ⏮ Previous
              </button>

              <button
                className="
            px-5 py-3
            bg-gray-100
            rounded-xl
            hover:bg-gray-200
            transition
            " onClick={() => {
                  if (currentFrame < frames.length - 1) {
                    setCurrentFrame(prev => prev + 1)
                  }
                }}
              >
                ⏭ Next
              </button>

              <button
                className="
            px-5 py-3
            bg-red-500
            text-white
            rounded-xl
            hover:bg-red-600
            transition
            "onClick={() => {
                  setCurrentFrame(0)
                }}
              >
                ↺ Reset
              </button>

            </div>


            <div className="text-gray-500">

              Frame {currentFrame + 1} / {frames.length}

            </div>

          </div>



          {/* VS CODE EDITOR */}

          <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-xl">

            {/* Top bar */}

            <div className="bg-[#2d2d2d] px-5 py-3 flex items-center gap-3">

              <div className="w-3 h-3 rounded-full bg-red-500"></div>

              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

              <div className="w-3 h-3 rounded-full bg-green-500"></div>

            </div>


            {/* Editor */}

            <div className="h-[650px] flex overflow-hidden">

              {/* Line Numbers */}

              <div className="bg-[#252526] w-16 text-gray-500 p-5 font-mono text-sm">

                {Array.from(
                  {
                    length: 50
                  },
                  (_, i) => (
                    <div key={i}>
                      {i + 1}
                    </div>
                  )
                )}
              </div>


              {/* Code */}

              <textarea
                spellCheck={false}
                readOnly
                value={
                  activeTab === "html"
                    ? currentCode.html
                    : activeTab === "css"
                      ? currentCode.css
                      : currentCode.js
                }
                className="
                                flex-1
                                bg-[#1e1e1e]
                                text-white
                                p-5
                                outline-none
                                resize-none
                                font-mono
                                text-sm overflow-y-auto"
              />

            </div>

          </div>



          {/* Contributors */}

          <div className="bg-white rounded-2xl shadow-md mt-5 p-6">

            <h2 className="text-xl font-semibold mb-5">

              Contributors

            </h2>



            <div className="space-y-4">

              <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">

                    A

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      abc

                    </h3>

                    <p className="text-sm text-gray-500">

                      28 Frames

                    </p>

                  </div>

                </div>


                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">

                  Active

                </div>

              </div>



              <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white">

                    B

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      ben

                    </h3>

                    <p className="text-sm text-gray-500">

                      15 Frames

                    </p>

                  </div>

                </div>


                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">

                  Active

                </div>

              </div>

            </div>

          </div>


        </div>


        {/* RIGHT SIDE */}

        <div className="col-span-4">

          <div className="bg-white rounded-2xl shadow-md p-6">

            {/* Current Time */}

            <div className="text-center">

              <h1 className="text-6xl font-bold">

                1:29

              </h1>

              <p className="text-gray-500 mt-2">

                of 3:42

              </p>

            </div>


            {/* Play Button */}

            <button
              className="
            mt-10
            w-full
            py-4
            bg-black
            text-white
            rounded-xl
            font-semibold
            hover:bg-gray-800
            transition
            "
            >

              ▶ Play

            </button>



            {/* Speed Buttons */}

            <div className="grid grid-cols-4 gap-3 mt-5">

              <button className="bg-gray-100 py-3 rounded-lg">
                0.5x
              </button>

              <button className="bg-black text-white py-3 rounded-lg">
                1x
              </button>

              <button className="bg-gray-100 py-3 rounded-lg">
                2x
              </button>

              <button className="bg-gray-100 py-3 rounded-lg">
                5x
              </button>

            </div>



            {/* Timeline */}

            <div className="mt-10">

              <input
                type="range"
                min="0"
                max={frames.length - 1}
                value={currentFrame}
                onChange={(e) => {

                  setCurrentFrame(Number(e.target.value))

                }}
                className="w-full accent-black"
              />

              <div className="flex justify-between text-gray-500 mt-2">

                <span>

                  1:29

                </span>

                <span>

                  3:42

                </span>

              </div>

            </div>



            {/* Frame Details */}

            <div className="bg-gray-50 rounded-xl p-5 mt-8">

              <div className="flex justify-between mb-4">

                <span className="text-gray-500">

                  Current Frame

                </span>

                <span className="font-semibold">

                  27

                </span>

              </div>


              <div className="flex justify-between">

                <span className="text-gray-500">

                  Total Frames

                </span>

                <span className="font-semibold">

                  47

                </span>

              </div>

            </div>



            {/* Activity Timeline */}

            <div className="mt-10">

              <h2 className="font-semibold text-lg mb-5">

                Activity Timeline

              </h2>


              <div className="space-y-5">

                <div>

                  <div className="flex justify-between mb-2">

                    <span>

                      abc

                    </span>

                    <span className="text-gray-500">

                      28 Frames

                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full">

                    <div className="h-3 bg-blue-500 rounded-full w-[85%]">

                    </div>

                  </div>

                </div>



                <div>

                  <div className="flex justify-between mb-2">

                    <span>

                      ben

                    </span>

                    <span className="text-gray-500">

                      15 Frames

                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full">

                    <div className="h-3 bg-pink-500 rounded-full w-[50%]">

                    </div>

                  </div>

                </div>

              </div>

            </div>



            {/* Session Info */}

            <div className="border rounded-2xl p-5 mt-10">

              <h2 className="font-semibold text-lg mb-5">

                Session Info

              </h2>


              <div className="flex justify-between mb-4">

                <span>

                  Started

                </span>

                <span>

                  14:32

                </span>

              </div>


              <div className="flex justify-between mb-4">

                <span>

                  Language

                </span>

                <span>

                  HTML

                </span>

              </div>


              <div className="flex justify-between mb-4">

                <span>

                  Lines

                </span>

                <span>

                  47

                </span>

              </div>


              <div className="flex justify-between">

                <span>

                  Contributors

                </span>

                <span>

                  2

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SessionReplay;