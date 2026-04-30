import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  return (
    <>
    <h1>CodeSync Home</h1>
    <button>Enter WorkSpace</button>
    </>
  )
}

export default Home