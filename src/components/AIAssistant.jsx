import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

function AIAssistant({ show, onClose }) {

    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")

    if (!show) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-[700px] h-[600px] rounded-xl shadow-xl p-5 flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">

                    <div className="flex items-center gap-2">
                        <FaRobot className="text-2xl" />
                        <h2 className="text-xl font-bold">
                            AI Code Assistant
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >
                        <IoClose />
                    </button>

                </div>

                {/* Prompt Section */}
                <div className="mt-4">

                    <label className="font-semibold">
                        Ask AI
                    </label>

                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Example: Create a responsive navbar using HTML and CSS"
                        className="w-full border rounded-md p-3 mt-2 h-32 resize-none"
                    />

                    <button
                        className="mt-3 bg-black text-white px-4 py-2 rounded-md"
                    >
                        Generate
                    </button>

                </div>

                {/* Response Section */}
                <div className="mt-5 flex-1 flex flex-col">

                    <h3 className="font-semibold mb-2">
                        AI Response
                    </h3>

                    <div className="border rounded-md p-3 bg-gray-100 flex-1 overflow-auto">

                        {response ? (
                            <pre className="whitespace-pre-wrap">
                                {response}
                            </pre>
                        ) : (
                            <p className="text-gray-500">
                                AI generated code will appear here...
                            </p>
                        )}

                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-4">

                    <button
                        className="border px-4 py-2 rounded-md"
                    >
                        Copy Code
                    </button>

                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                        Insert Into Editor
                    </button>

                </div>

            </div>

        </div>
    )
}

export default AIAssistant