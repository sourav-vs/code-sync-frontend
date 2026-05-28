import React, { useState } from 'react'
import WorkSpaceHeader from '../components/WorkSpaceHeader'
import { FaEye } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { GoShare } from "react-icons/go";
import { io } from "socket.io-client"
import { useEffect } from 'react';
import { baseUrl } from '../services/BaseURL';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRef } from "react"
import Chat from '../components/chat';



function WorkSpace() {
  const [activeTab, setActiveTab] = useState("html")
  const [html, setHtml] = useState("")
  const [css, setCss] = useState("")
  const [js, setJs] = useState("")
  const isEmpty = !html && !css && !js

  const navigate = useNavigate()
  const location = useLocation()

  const [previewHtml, setPreviewHtml] = useState("")
  const [previewCss, setPreviewCss] = useState("")
  const [previewJs, setPreviewJs] = useState("")

  const [messageHistory, setMessageHistory] = useState([])

  const [onlineUsers, setOnlineUsers] = useState([])

  const runCode = () => {
    setPreviewHtml(html)
    setPreviewCss(css)
    setPreviewJs(js)
  }

  const socketRef = useRef()

  const { roomId } = useParams()

  console.log(roomId)

  useEffect(() => {

    socketRef.current = io(baseUrl)

    socketRef.current.on("connect", () => {

      console.log("socket connected")

      const username = localStorage.getItem("username")

      socketRef.current.emit("join-room", {
        roomId,
        username
      })

    })

    socketRef.current.on(
      "online-users",
      (users) => {

        setOnlineUsers(users)

      }
    )

    socketRef.current.on("receive-code", (data) => {

      console.log("received code")

      setHtml(data.html)
      setCss(data.css)
      setJs(data.js)

    })

    socketRef.current.on("receive-message", (data) => {

      console.log("received in workspace", data)

      setMessageHistory((prev) => [
        ...prev,
        data
      ])

    })

    return () => {

      socketRef.current.disconnect()

    }



  }, [roomId])

  useEffect(() => {

    const token =
      localStorage.getItem("token")

    if (!token) {

      navigate('/auth', {
        state: {
          from: location.pathname
        }
      })

    }

  }, [navigate, location])


  const srcDoc = `
  <html>
    <head>
      <style>${previewCss}</style>
    </head>
    <body>
      ${previewHtml}
      <script>${previewJs}<\/script>
    </body>
  </html>
`


  return (
    <>
      <WorkSpaceHeader onlineUsers={onlineUsers} />

      <div className='grid grid-cols-5'>
        <div className="col-span-3 h-[calc(100vh-60px)] flex flex-col text-black p-4">

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
          <div className="flex-1">
            <textarea
              className="w-full h-full border border-gray-700 shadow-md rounded-md p-4 text-sm outline-none focus:ring-2 focus:ring-gray-600"

              value={activeTab == "html" ? html : activeTab == "css" ? css : js}

              onChange={(e) => {
                const value = e.target.value

                let updatedHtml = html
                let updatedCss = css
                let updatedJs = js

                if (activeTab === "html") {
                  updatedHtml = value
                  setHtml(value)
                }
                else if (activeTab === "css") {
                  updatedCss = value
                  setCss(value)
                }
                else {
                  updatedJs = value
                  setJs(value)
                }
                console.log("emitting code")
                socketRef.current.emit("code-change", {
                  roomId,
                  html: updatedHtml,
                  css: updatedCss,
                  js: updatedJs
                })
              }}
              placeholder={
                activeTab === "html"
                  ? "Write HTML here..."
                  : activeTab === "css"
                    ? "Write CSS here..."
                    : "Write JavaScript here..."
              }

            />
          </div>

          <Chat socketRef={socketRef} roomId={roomId} messageHistory={messageHistory} setMessageHistory={setMessageHistory} />


        </div>
        <div className='col-span-2'>
          <div className='flex items-center justify-between p-4 border-gray-700'>
            <div className='flex items-center gap-3 text-gray-600'>
              <FaEye />
              <h1>Live Preview</h1>
            </div>

            <div className='flex items-center gap-3 text-gray-400'>
              <TbReload onClick={runCode} className="cursor-pointer hover:text-black" />
              <GoShare className="cursor-pointer hover:text-black" />
            </div>
          </div>

          <div className='h-[80vh] mx-3 mt-1 border border-gray-700 rounded-md flex items-center justify-center bg-[#161b22]'>
            {isEmpty ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400">Live Preview Output</p>
              </div>
            ) : (
              <iframe
                srcDoc={srcDoc}
                title="preview"
                sandbox="allow-scripts"
                frameBorder="0"
                className="w-full h-full bg-white rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkSpace