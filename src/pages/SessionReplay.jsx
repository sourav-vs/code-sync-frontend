import React, { useState } from "react";

function SessionReplay() {

  const [activeTab, setActiveTab] = useState("html")

  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [currentTime, setCurrentTime] = useState(89)
  const totalDuration = 222
  return (
    <div className="bg-gray-100 min-h-screen p-5">

      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center mb-5">

        <div>
          <h1 className="text-3xl font-bold">
            Session Replay
          </h1>

          <p className="text-gray-500 mt-1">
            Room ID : 5bb3ee66
          </p>
        </div>

        <div className="flex gap-3">

          <div className="bg-gray-100 px-4 py-2 rounded-lg">
            2 Users
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-lg">
            47 Frames
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-lg">
            3m 42s
          </div>

        </div>

      </div>


      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-5">

        {/* Left Section */}
        <div className="col-span-8">

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md p-3 flex gap-3 mb-5">

            <button
              onClick={() => setActiveTab("html")}
              className={`
        px-5 py-2 rounded-lg font-medium transition
        ${activeTab === "html"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"}
        `}
            >
              HTML
            </button>

            <button
              onClick={() => setActiveTab("css")}
              className={`
        px-5 py-2 rounded-lg font-medium transition
        ${activeTab === "css"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"}
        `}
            >
              CSS
            </button>

            <button
              onClick={() => setActiveTab("js")}
              className={`
        px-5 py-2 rounded-lg font-medium transition
        ${activeTab === "js"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"}
        `}
            >
              JavaScript
            </button>

          </div>


          {/* Code Viewer */}
          <div className="bg-[#0f172a] rounded-xl shadow-md h-[550px] p-5">

            <textarea
              readOnly
              value={`<h1>Hello World</h1>`}
              className="w-full h-full bg-transparent outline-none resize-none text-white font-mono"
            />

          </div>


          {/* Contributors */}
          <div className="bg-white rounded-xl shadow-md mt-5 p-5">

            <h2 className="font-semibold text-lg mb-4">
              Contributors
            </h2>

            <div className="flex gap-10">

              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>

                <div>
                  <h3>abc</h3>
                  <p className="text-gray-500 text-sm">
                    28 Frames
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-pink-500"></div>

                <div>
                  <h3>ben</h3>
                  <p className="text-gray-500 text-sm">
                    15 Frames
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* Right Section */}
        <div className="col-span-4">

          <div className="bg-white rounded-xl shadow-md p-6">

            {/* Time */}
            <div className="text-center">

              <h1 className="text-6xl font-bold">
                1:29
              </h1>

              <p className="text-gray-500 mt-2">
                of 3:42
              </p>

            </div>

            {/* Placeholder for controls */}
            <div className="mt-10">

              {/* Play button */}
              <button
                className={`
        w-full
        py-4
        rounded-xl
        font-semibold
        shadow
        transition
        ${isPlaying
                    ? "bg-black text-white"
                    : "bg-white border"
                  }
    `}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>


              {/* Speed buttons */}
              <div className="grid grid-cols-4 gap-3 mt-5">

                {[0.5, 1, 2, 5].map((speed) => (

                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`
                py-3
                rounded-lg
                transition
                ${playbackSpeed === speed
                        ? "bg-black text-white"
                        : "bg-gray-100"
                      }
            `}
                  >
                    {speed}x
                  </button>

                ))}

              </div>


              {/* Timeline */}
              <div className="mt-8">

                <input
                  type="range"
                  min="0"
                  max={totalDuration}
                  value={currentTime}
                  className="w-full accent-black"
                />

                <div className="flex justify-between text-gray-500 mt-2">

                  <span>
                    {Math.floor(currentTime / 60)}:
                    {(currentTime % 60).toString().padStart(2, "0")}
                  </span>

                  <span>
                    {Math.floor(totalDuration / 60)}:
                    {(totalDuration % 60).toString().padStart(2, "0")}
                  </span>

                </div>

              </div>

              <div className="mt-10">

                <h2 className="font-semibold mb-5">
                  Activity Timeline
                </h2>

                <div className="space-y-4">

                  <div>
                    <div className="h-2 bg-blue-500 rounded-full w-[85%]"></div>
                  </div>

                  <div>
                    <div className="h-2 bg-pink-500 rounded-full w-[55%]"></div>
                  </div>

                </div>

              </div>

            </div>


            {/* Session Info */}
            <div className="border rounded-xl p-4 mt-8">

              <div className="flex justify-between mb-4">
                <span>Started :</span>
                <span>14:32</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Language :</span>
                <span>HTML</span>
              </div>

              <div className="flex justify-between">
                <span>Lines :</span>
                <span>47</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SessionReplay;