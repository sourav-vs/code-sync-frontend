import React, { useState } from 'react'
import WorkSpaceHeader from '../components/WorkSpaceHeader'
import { FaEye } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { IoIosSave } from "react-icons/io";
import { io } from "socket.io-client"
import { useEffect } from 'react';
import { baseUrl } from '../services/BaseURL';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRef } from "react"
import Chat from '../components/chat';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { deleteRoomAPI, getRoomCodeAPI, saveRoomCodeAPI } from '../services/allAPI';
import AIAssistant from '../components/AIAssistant';
import Editor from "@monaco-editor/react";

function WorkSpace() {
  const [activeTab, setActiveTab] = useState("html")
  const [html, setHtml] = useState("")
  const [css, setCss] = useState("")
  const [js, setJs] = useState("")
  const isEmpty = !html && !css && !js
  const [isLoaded, setIsLoaded] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const [previewHtml, setPreviewHtml] = useState("")
  const [previewCss, setPreviewCss] = useState("")
  const [previewJs, setPreviewJs] = useState("")

  const [messageHistory, setMessageHistory] = useState([])

  const [onlineUsers, setOnlineUsers] = useState([])

  const [showAI, setShowAI] = useState(false)

  const editorRef = useRef(null)

  const [htmlCursor, setHtmlCursor] = useState(0)
  const [cssCursor, setCssCursor] = useState(0)
  const [jsCursor, setJsCursor] = useState(0)

  const runCode = () => {
    setPreviewHtml(html)
    setPreviewCss(css)
    setPreviewJs(js)
  }

  const socketRef = useRef()
  const hasChangedRef = useRef(false)

  const htmlRef = useRef("")
  const cssRef = useRef("")
  const jsRef = useRef("")
  const sourceRef = useRef("manual")

  const { roomId } = useParams()

  console.log(roomId)

  useEffect(() => {
    htmlRef.current = html
  }, [html])

  useEffect(() => {
    cssRef.current = css
  }, [css])

  useEffect(() => {
    jsRef.current = js
  }, [js])

  useEffect(() => {
    const username = localStorage.getItem("username")
    if (!username) return
    socketRef.current = io(baseUrl)
    socketRef.current.on("connect", () => {
      console.log("TEST FRAME EMITTED")
      console.log("socket connected")
      socketRef.current.emit("join-room", {
        roomId,
        username
      })
    })
    // joined user
    socketRef.current.on("user-joined", (data) => {
      console.log(
        "JOIN EVENT RECEIVED",
        data.username,
        username
      )

      if (data.username !== username) {
        toast.success(
          `${data.username} joined the room`,
          {
            autoClose: 3000
          }
        )
      }
    })

    socketRef.current.on(
      "online-users",
      (users) => {

        setOnlineUsers(users)

      }
    )

    // leave user
    socketRef.current.on("user-left", (data) => {
      console.log("LEFT EVENT RECEIVED", data)
      if (data.username !== username) {
        toast.info(
          `${data.username} left the room`,
          {
            autoClose: 3000
          }
        )
      }
    })
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
      socketRef.current.off("user-joined")
      socketRef.current.off("user-left")
      socketRef.current.off("online-users")
      socketRef.current.off("receive-code")
      socketRef.current.off("receive-message")
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

  useEffect(() => {
    loadRoomCode()
  }, [roomId])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) return
      saveCode()
    }, 2000)
    return () => clearTimeout(timer)
  }, [html, css, js, isLoaded])

  useEffect(() => {
    if (!isLoaded) return
    const interval = setInterval(() => {
      if (!hasChangedRef.current) return
      const username = localStorage.getItem("username")
      socketRef.current?.emit("save-frame", {
        roomId,
        userId: username,
        username,
        html: htmlRef.current,
        css: cssRef.current,
        js: jsRef.current,
        source: sourceRef.current
      })
      console.log("FRAME SAVED")
      hasChangedRef.current = false
      sourceRef.current = "manual"
    }, 5000)
    return () => clearInterval(interval)
  }, [roomId, isLoaded])

  const loadRoomCode = async () => {
    try {
      const result =
        await getRoomCodeAPI(roomId)
      if (result.status === 200 && result.data) {
        setHtml(result.data.html || "")
        setCss(result.data.css || "")
        setJs(result.data.js || "")
      }
      setIsLoaded(true)
    }
    catch (err) {
      console.log(err)
    }
  }

  const saveCode = async () => {
    try {
      await saveRoomCodeAPI({ roomId, html, css, js })
      console.log("Code Saved")
    }
    catch (err) {
      console.log(err)
    }
  }

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

  const handleDelete = async () => {
    try {
      const result = await deleteRoomAPI(roomId)
      if (result.status == 200) {
        toast.success("Room deleted successfully")
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <WorkSpaceHeader onlineUsers={onlineUsers} />

      {
        showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[350px]">
              <h2 className="text-xl font-semibold mb-4">
                Delete Room
              </h2>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this room?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      }

      <div className={`flex flex-col lg:flex-row transition-all duration-300 ${showAI ? "lg:mr-[350px]" : ""
        }`}>
        <div className={showAI
          ? "w-full lg:w-[60%] px-3"
          : "w-full lg:w-[65%] px-3"
        }>

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

          <div className="flex-1 gap-3">
            <Editor
              height="80vh"
              theme="vs-dark"
              language={
                activeTab === "html"
                  ? "html"
                  : activeTab === "css"
                    ? "css"
                    : "javascript"
              }

              value={
                activeTab === "html"
                  ? html
                  : activeTab === "css"
                    ? css
                    : js
              }

              onMount={(editor) => {

                editorRef.current = editor

                // Cursor tracking
                editor.onDidChangeCursorPosition((e) => {

                  const offset =
                    editor
                      .getModel()
                      .getOffsetAt(e.position)

                  if (activeTab === "html")
                    setHtmlCursor(offset)

                  else if (activeTab === "css")
                    setCssCursor(offset)

                  else
                    setJsCursor(offset)

                })

                // Detect paste
                editor.onDidPaste(() => {

                  sourceRef.current = "paste"

                  hasChangedRef.current = true

                  console.log("PASTE DETECTED")

                })

              }}

              onChange={(value) => {

                let updatedHtml = html
                let updatedCss = css
                let updatedJs = js

                // If not paste or AI, assume manual typing
                if (
                  sourceRef.current !== "paste" &&
                  sourceRef.current !== "ai"
                ) {
                  sourceRef.current = "manual"
                }

                if (activeTab === "html") {

                  updatedHtml = value || ""

                  setHtml(updatedHtml)

                }

                else if (activeTab === "css") {

                  updatedCss = value || ""

                  setCss(updatedCss)

                }

                else {

                  updatedJs = value || ""

                  setJs(updatedJs)

                }

                hasChangedRef.current = true

                socketRef.current.emit(
                  "code-change",
                  {
                    roomId,
                    html: updatedHtml,
                    css: updatedCss,
                    js: updatedJs
                  }
                )

              }}

              options={{
                minimap: {
                  enabled: true
                },

                fontSize: 14,

                automaticLayout: true,

                wordWrap: "on",

                autoClosingBrackets: "always",

                autoClosingQuotes: "always",

                formatOnPaste: true,

                formatOnType: true,

                scrollBeyondLastLine: false,

                padding: {
                  top: 20
                }
              }}
            />
          </div>

          <Chat socketRef={socketRef} roomId={roomId} messageHistory={messageHistory} setMessageHistory={setMessageHistory} />


        </div>

        <div className={
          showAI
            ? "w-full lg:w-[40%] px-3"
            : "w-full lg:w-[35%] px-3"
        }>
          <div className='flex items-center justify-between pt-5 border-gray-700'>
            <div className='flex items-center gap-3 text-gray-600'>
              <FaEye />
              <h1>Live Preview</h1>
            </div>

            <div className='flex items-center gap-3 text-gray-400'>
              <button onClick={() => navigate(`/session-replay/${roomId}`)} className="rounded-lg">▶ Replay Session</button>
              <TbReload onClick={runCode} className="cursor-pointer hover:text-black" />
              <button className='me-2'
                onClick={() => {
                  console.log("AI CLICKED")
                  setShowAI(prev => !prev)
                }}
              >
                🤖
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-500 font-semibold"
              >
                🗑 Delete Room
              </button>
            </div>
          </div>

          <div className='h-[50vh] md:h-[80vh] border border-gray-700 rounded-md flex items-center justify-center bg-[#161b22]'>
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

        {
          showAI && (
            <>
              <div
                className="
                hidden
                md:block
      fixed
      right-3
      top-[70px]
      sm:top-[85px]
      w-[95vw]
      sm:w-[340px]
      h-[calc(100vh-100px)]
      bg-white
      border
      rounded-xl
      shadow-xl
      overflow-hidden
      z-50
    ">
                <AIAssistant onClose={() => setShowAI(false)} setHtml={setHtml} setCss={setCss} setJs={setJs} socketRef={socketRef} roomId={roomId} html={html} css={css} js={js} htmlCursor={htmlCursor} cssCursor={cssCursor} jsCursor={jsCursor} activeTab={activeTab} sourceRef={sourceRef} hasChangedRef={hasChangedRef} />
              </div>
              <div className="md:hidden fixed bottom-0 left-0 right-0 h-[55vh] bg-white rounded-t-2xl shadow-2xl z-50">
                <AIAssistant onClose={() => setShowAI(false)} setHtml={setHtml} setCss={setCss} setJs={setJs} socketRef={socketRef} roomId={roomId} html={html} css={css} js={js} htmlCursor={htmlCursor} cssCursor={cssCursor} jsCursor={jsCursor} activeTab={activeTab} sourceRef={sourceRef} hasChangedRef={hasChangedRef} />
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default WorkSpace