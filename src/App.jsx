import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import WorkSpace from './pages/WorkSpace'
import Auth from './pages/Auth'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionReplay from './pages/SessionReplay'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workspace/:roomId' element={<WorkSpace />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/session-replay/:roomId' element={<SessionReplay/>}/>
      </Routes>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        theme="light"
      />
    </>
  )
}

export default App
