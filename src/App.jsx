import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import WorkSpace from './pages/WorkSpace'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/WorkSpace' element={<WorkSpace />} />
      </Routes>
    </>
  )
}

export default App
