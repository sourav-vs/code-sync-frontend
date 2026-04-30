import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import WorkSpace from './pages/workSpace'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workspace' element={<WorkSpace />} />
      </Routes>
    </>
  )
}

export default App
