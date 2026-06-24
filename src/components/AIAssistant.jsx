import React, { useState } from 'react'
import { generateCodeAPI } from '../services/allAPI'


function AIAssistant({ onClose, setHtml, setCss, setJs, socketRef, roomId, html, css, js, htmlCursor, cssCursor, jsCursor, activeTab, sourceRef, hasChangedRef, activityRef }) {

    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        if (!prompt.trim()) return
        try {
            setLoading(true)
            const result =
                await generateCodeAPI({
                    prompt
                })
            if (result.status === 200) {
                setResponse(
                    result.data.response
                )
            }
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    const insertCode = () => {

        const htmlMatch =
            response.match(
                /<body[^>]*>([\s\S]*)<\/body>/i
            )
        const newHtml =
            (
                htmlMatch
                    ? htmlMatch[1]
                    : response
            )
                .replace(
                    /<style[^>]*>[\s\S]*?<\/style>/gi,
                    ""
                )
                .replace(
                    /<script[^>]*>[\s\S]*?<\/script>/gi,
                    ""
                )
                .trim()

        const styles =
            [
                ...response.matchAll(
                    /<style[^>]*>([\s\S]*?)<\/style>/gi
                )
            ]

        const newCss =
            styles
                .map(match => match[1])
                .join("\n\n")

        const scripts =
            [
                ...response.matchAll(
                    /<script[^>]*>([\s\S]*?)<\/script>/gi
                )
            ]

        const newJs =
            scripts
                .map(match => match[1])
                .join("\n\n")

        let updatedHtml = html
        let updatedCss = css
        let updatedJs = js


        updatedHtml =
            activeTab === "html"
                ?
                html.slice(0, htmlCursor ?? html.length) + newHtml + html.slice(htmlCursor ?? html.length)
                :
                html + "\n" + newHtml

        updatedCss =
            newCss
                ? (
                    activeTab === "css"
                        ? css.slice(0, cssCursor ?? css.length)
                        + newCss
                        + css.slice(cssCursor ?? css.length)
                        : css + "\n" + newCss
                )
                : css

        updatedJs =
            activeTab === "js"
                ?
                js.slice(0, jsCursor ?? js.length) + newJs + js.slice(jsCursor ?? js.length)
                :
                js + "\n" + newJs


        let startLine = 1
        let aiLineCount = 0

        if (activeTab === "html") {

            startLine =
                html
                    .slice(
                        0,
                        htmlCursor ?? html.length
                    )
                    .split("\n").length

            aiLineCount =
                newHtml
                    .split("\n").length

        }

        else if (activeTab === "css") {

            startLine =
                css
                    .slice(
                        0,
                        cssCursor ?? css.length
                    )
                    .split("\n").length

            aiLineCount =
                newCss
                    .split("\n").length

        }

        else {

            startLine =
                js
                    .slice(
                        0,
                        jsCursor ?? js.length
                    )
                    .split("\n").length

            aiLineCount =
                newJs
                    .split("\n").length

        }

        activityRef.current.push({

            source: "ai",

            startLine,

            endLine:
                startLine +
                aiLineCount -
                1,

            lineCount:
                aiLineCount,

            timestamp:
                Date.now()

        })

        sourceRef.current = "ai"
        hasChangedRef.current = true
        setHtml(updatedHtml)
        setCss(updatedCss)
        setJs(updatedJs)
        socketRef.current.emit(
            "code-change",
            {
                roomId,
                html: updatedHtml,
                css: updatedCss,
                js: updatedJs
            }
        )

    }

    return (
        <div className="h-full flex flex-col bg-white rounded-lg">

            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <h2 className="font-semibold text-lg">
                        AI Assistant
                    </h2>
                </div>

                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>
            <div className="flex flex-wrap gap-2 my-2 mx-2">

                <button
                    className="text-sm px-2 py-1 border rounded"
                    onClick={() => setPrompt("Create a responsive navbar")}
                >
                    Navbar
                </button>

                <button
                    className="text-sm px-2 py-1 border rounded"
                    onClick={() => setPrompt("Create a login form")}
                >
                    Login Form
                </button>

                <button
                    className="text-sm px-2 py-1 border rounded"
                    onClick={() => setPrompt("Create a landing page")}
                >
                    Landing Page
                </button>

            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">

                <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm font-medium">
                        You
                    </p>
                    <p>Create a responsive navbar</p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-600">
                        AI
                    </p>
                    {
                        loading
                            ? <p>Generating...</p>
                            : <pre className="whitespace-pre-wrap text-sm">
                                {response || "AI generated code will appear here..."}
                            </pre>
                    }
                </div>

            </div>

            {/* Input Section */}
            <div className="border-t p-4">

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    placeholder="Ask AI to generate HTML, CSS or JavaScript..."
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-2 mt-3">

                    <button onClick={handleGenerate}
                        className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                    >
                        Generate
                    </button>

                    <button onClick={insertCode}
                        className="px-4 border rounded-lg hover:bg-gray-100"
                    >
                        Insert
                    </button>

                </div>

            </div>

        </div>
    )
}

export default AIAssistant