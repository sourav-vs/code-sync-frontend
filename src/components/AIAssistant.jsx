import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

function AIAssistant({ show, onClose }) {

    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")

    if (!show) return null

    return (
        <>
            <div className="h-[calc(100vh-80px)] bg-black border rounded-lg shadow-lg p-4">
    
                <div className="flex justify-between items-center">
    
                    <h2 className="font-bold text-lg">
                        🤖 AI Assistant
                    </h2>
    
                </div>
    
                <hr className="my-3" />
    
                <label>
                    Ask AI
                </label>
    
                <textarea
                    className="w-full border rounded-md p-3 mt-2"
                    rows="6"
                    placeholder="Create a responsive navbar using HTML and CSS"
                />
    
                <button
                    className="bg-black text-white px-4 py-2 rounded mt-3"
                >
                    Generate
                </button>
    
                <h3 className="mt-5 font-semibold">
                    Response
                </h3>
    
                <div
                    className="border rounded-md mt-2 p-3 h-[350px] overflow-y-auto"
                >
    
                    AI response here
    
                </div>
    
                <div className="flex justify-end gap-2 mt-3">
    
                    <button className="border px-3 py-2 rounded">
                        Copy
                    </button>
    
                    <button className="bg-green-600 text-white px-3 py-2 rounded">
                        Insert
                    </button>
    
                </div>
    
            </div>
        </>
    )
}

export default AIAssistant