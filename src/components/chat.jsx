import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function Chat({ socketRef, roomId }) {

    const [openChat, setOpenChat] = useState(false)

    const [message, setMessage] = useState("")
    const [messageHistory, setMessageHistory] = useState([])
    console.log(messageHistory);


    useEffect(() => {

        if (!socketRef?.current) return

        const socket = socketRef.current

        socket.on("receive-message", (data) => {

            console.log("received", data)

            setMessageHistory((prev) => [
                ...prev,
                data.message
            ])

        })

        return () => {
            socket.off("receive-message")
        }

    }, [socketRef])


    const sendMessage = () => {

        if (!message.trim()) return
        console.log("sending message")
        socketRef.current.emit("send-message", {
            roomId,
            message
        })

        setMessage("")
    }

    return (
        <>

            {/* Floating Chat Button */}
            <button
                onClick={() => setOpenChat(!openChat)}
                className="fixed bottom-6 right-6 bg-black hover:bg-gray-500 text-white p-4 rounded-full shadow-lg z-50"
            >
                <IoChatbubbleEllipses size={24} />
            </button>

            {/* Chat Modal */}
            {openChat && (
                <div className="fixed bottom-24 right-6 w-[320px] h-[500px] bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#1f2937]">
                        <div>
                            <h1 className="text-white font-semibold">Team Chat</h1>
                            <p className="text-xs text-gray-400">Realtime Collaboration</p>
                        </div>

                        <button
                            onClick={() => setOpenChat(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <IoClose size={22} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">

                        {messageHistory.map((msg, index) => (

                            <div key={index} className="flex justify-start">
                                <div className="bg-white text-black px-4 py-2 rounded-2xl max-w-[80%]">
                                    {msg}
                                </div>
                            </div>

                        ))}

                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-gray-700 flex gap-2 bg-[#1f2937]">

                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 bg-[#21262d] text-white px-3 py-2 rounded-lg outline-none"
                        />

                        <button onClick={sendMessage} className="bg-gray-500 hover:bg-black text-white px-4 rounded-lg">
                            Send
                        </button>

                    </div>
                </div>
            )}

        </>
    )
}

export default Chat