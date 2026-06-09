import React, { useRef, useState } from "react";
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

  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)


  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentFrame(prev => {
        if (prev >= frames.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, speed)
    return () => clearInterval(interval)
  }, [isPlaying, speed, frames.length])

  let manualChars = 0
  let aiChars = 0
  let pasteChars = 0

  frames.forEach(frame => {
    if (frame.source === "manual")
      manualChars += frame.contributionSize || 0

    else if (frame.source === "ai")
      aiChars += frame.contributionSize || 0

    else if (frame.source === "paste")
      pasteChars += frame.contributionSize || 0

  })
  const totalContribution =
    manualChars +
    aiChars +
    pasteChars

  const manualPercentage =
    totalContribution ? ((manualChars / totalContribution) * 100).toFixed(1) : 0

  const aiPercentage =
    totalContribution ? ((aiChars / totalContribution) * 100).toFixed(1) : 0

  const pastePercentage =
    totalContribution ? ((pasteChars / totalContribution) * 100).toFixed(1) : 0

  const getFrames = async () => {
    try {
      const result = await getReplayFramesAPI(roomId)
      console.log(
        result.data.map(frame => frame.source)
      )
      setFrames([{ html: "", css: "", js: "", source: "manual" }, ...result.data])
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

  const currentFrameData = frames[currentFrame]

  const firstRealFrame =
    frames.find(frame => frame.timestamp)

  const startedTime =
    firstRealFrame
      ? new Date(firstRealFrame.timestamp).toLocaleTimeString()
      : "--"

  const currentContent =
    activeTab === "html"
      ? currentCode.html
      : activeTab === "css"
        ? currentCode.css
        : currentCode.js

  const lineCount =
    currentContent
      ? currentContent.split("\n").length
      : 0

  const contributors = {}

  frames.forEach(frame => {
    if (!frame.username) return
    if (!contributors[frame.username]) {
      contributors[frame.username] = 0
    }
    contributors[frame.username]++
  })
  const maxFrames = Math.max(...Object.values(contributors), 1)

  const totalDuration = frames.length
  const currentTime = currentFrame
  const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2,"0")}`
}

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center mb-5">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">🎬 Session Replay</h1>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              ● Replay Ready
            </div>
          </div>
          <p className="text-gray-500 mt-2">Room ID : {roomId}</p>
        </div>

        <div className="flex gap-3">
          <div className="bg-gray-100 px-5 py-3 rounded-xl">{Object.keys(contributors).length} Users</div>
          <div className="bg-gray-100 px-5 py-3 rounded-xl">{frames.length} Frames</div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-5">
        {/* LEFT SIDE */}
        <div className="col-span-8">
          {/* Language Tabs */}
          <div className="bg-white rounded-xl shadow-md p-3 flex gap-3 mb-5">
            <button onClick={() => setActiveTab("html")} className={`px-5 py-2 rounded-lg transition ${activeTab === "html" ? "bg-black text-white" : "bg-gray-100"}`}
            >HTML</button>

            <button onClick={() => setActiveTab("css")} className={`px-5 py-2 rounded-lg transition${activeTab === "css" ? "bg-black text-white" : "bg-gray-100"}`}>CSS</button>

            <button onClick={() => setActiveTab("js")} className={`px-5 py-2 rounded-lg transition ${activeTab === "js" ? "bg-black text-white" : "bg-gray-100"}`}
            > JavaScript </button>
          </div>

          {/* Frame Controls */}
          <div className="bg-white rounded-xl shadow-md p-3 flex items-center justify-between mb-5">
            <div className="flex gap-3">
              <button className=" px-5 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition" onClick={() => {
                setIsPlaying(false)

                if (currentFrame > 0)
                  setCurrentFrame(prev => prev - 1)
              }}>⏮ Previous</button>

              <button className="px-5 py-3bg-gray-100 rounded-xl hover:bg-gray-200 transition" onClick={() => {
                setIsPlaying(false)

                if (currentFrame < frames.length - 1)
                  setCurrentFrame(prev => prev + 1)
              }}>⏭ Next</button>

              <button className="px-5 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition " onClick={() => { setCurrentFrame(0) }}>↺ Reset</button>
            </div>

            <div className="text-gray-500">
              Frame {currentFrame + 1} / {frames?.length}
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
                {Array.from({ length: 50 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code */}
              <textarea spellCheck={false}
                readOnly
                value={
                  activeTab === "html"
                    ? currentCode.html
                    : activeTab === "css"
                      ? currentCode.css
                      : currentCode.js
                }
                className="flex-1 bg-[#1e1e1e] text-white p-5 outline-none resize-none font-mono text-sm overflow-y-auto" />
            </div>
          </div>



          {/* Contributors */}

          <div className="bg-white rounded-2xl shadow-md mt-5 p-6">
            <h2 className="text-xl font-semibold mb-5">Contributors</h2>

            <div className="space-y-4">
              {
                Object.entries(contributors).map(([username, count], index) => (
                  <div key={username} className="flex justify-between items-center">

                    <div className="flex items-center gap-4">

                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${index % 2 === 0 ? "bg-blue-500" : "bg-pink-500"
                        }`}>
                        {username[0].toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold">{username}</h3>

                        <p className="text-sm text-gray-500">
                          {count} Frames
                        </p>
                      </div>

                    </div>

                  </div>
                ))
              }
            </div>
          </div>
        </div>


        {/* RIGHT SIDE */}

        <div className="col-span-4">
          <div className="bg-white rounded-2xl shadow-md p-6">
            {/* Current Time */}
            <div className="text-center">
              <h1 className="text-6xl font-bold">
                {formatTime(currentTime)}
              </h1>

              <p className="text-gray-500 mt-2">
                of {formatTime(totalDuration)}
              </p>
            </div>

            {/* Play Button */}

            <button onClick={() => setIsPlaying(prev => !prev)} className="mt-10 w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition">{isPlaying ? "⏸ Pause" : "▶ Play"}</button>

            {/* Speed Buttons */}
            <div className="grid grid-cols-4 gap-3 mt-5">
              <button onClick={() => setSpeed(2000)} className={speed === 2000 ? "bg-black text-white py-3 rounded-lg" : "bg-gray-100 py-3 rounded-lg"}>0.5x</button>

              <button onClick={() => setSpeed(1000)} className={speed === 1000 ? "bg-black text-white py-3 rounded-lg" : "bg-gray-100 py-3 rounded-lg"}>1x</button>

              <button onClick={() => setSpeed(500)} className={speed === 500 ? "bg-black text-white py-3 rounded-lg" : "bg-gray-100 py-3 rounded-lg"}>2x</button>

              <button onClick={() => setSpeed(200)} className={speed === 200 ? "bg-black text-white py-3 rounded-lg" : "bg-gray-100 py-3 rounded-lg"}>5x</button>
            </div>

            {/* Timeline */}
            <div className="mt-10">

              <input
                type="range"
                min="0"
                max={frames.length - 1}
                value={currentFrame}
                onChange={(e) => {
                  setIsPlaying(false)
                  setCurrentFrame(Number(e.target.value))
                }}
                className="w-full accent-black"
              />

              <div className="flex justify-between text-gray-500 mt-2">
                <div className="flex justify-between text-gray-500 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>

            </div>

            {/* Frame Details */}
            <div className="bg-gray-50 rounded-xl p-5 mt-8">
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Current Frame</span>
                <span className="font-semibold">{currentFrame + 1}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Frames</span>
                <span className="font-semibold">{frames.length}</span>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="mt-10">
              <h2 className="font-semibold text-lg mb-5">Activity Timeline</h2>

              <div className="space-y-5">
                {
                  Object.entries(contributors).map(([username, count], index) => (
                    <div key={username}>

                      <div className="flex justify-between mb-2">

                        <span>
                          {username}
                        </span>

                        <span className="text-gray-500">
                          {count} Frames
                        </span>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full">

                        <div
                          className={`h-3 rounded-full ${index % 2 === 0 ? "bg-blue-500" : "bg-pink-500"
                            }`}
                          style={{
                            width: `${(count / maxFrames) * 100}%`
                          }}
                        ></div>

                      </div>

                    </div>
                  ))
                }
              </div>
            </div>

            {/* Session Info */}

            <div className="border rounded-2xl p-5 mt-10">
              <h2 className="font-semibold text-lg mb-5">Session Info</h2>

              <div className="bg-gray-50 rounded-2xl p-5 mt-8">
                <h2 className="font-semibold text-lg mb-5">Last Action</h2>

                <div className="flex justify-between mb-4">
                  <span>Source</span>

                  {currentFrameData?.source === "manual" && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      ⌨️ Manual
                    </span>
                  )}

                  {currentFrameData?.source === "paste" && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      📋 Pasted
                    </span>
                  )}

                  {currentFrameData?.source === "ai" && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      🤖 AI Generated
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-semibold text-lg mb-5">Contribution Analysis</h2>

                <div className="space-y-5">

                  {/* Manual */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>⌨️ Manual Typing</span>
                      <span>{manualPercentage}%</span>
                    </div>

                    <div className="h-3 bg-gray-200 rounded-full">
                      <div
                        className="h-3 bg-blue-500 rounded-full"
                        style={{ width: `${manualPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* AI */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>🤖 AI Generated</span>
                      <span>{aiPercentage}%</span>
                    </div>

                    <div className="h-3 bg-gray-200 rounded-full">
                      <div
                        className="h-3 bg-purple-500 rounded-full"
                        style={{ width: `${aiPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Paste */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>📋 Pasted</span>
                      <span>{pastePercentage}%</span>
                    </div>

                    <div className="h-3 bg-gray-200 rounded-full">
                      <div
                        className="h-3 bg-yellow-500 rounded-full"
                        style={{ width: `${pastePercentage}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex justify-between mb-4">
                <span>Started</span>
                <span>{startedTime}</span>
              </div>

              {/* <div className="flex justify-between mb-4">
                <span>Language</span>
                <span>{activeTab.toUpperCase()}</span>
              </div> */}

              <div className="flex justify-between mb-4">
                <span>Lines</span>
                <span>{lineCount}</span>
              </div>

              <div className="flex justify-between">
                <span>Contributors</span>
                <span>{Object.keys(contributors).length}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SessionReplay;