import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import workSpace from './pages/workSpace'


function App() {

  return (
   <>
   <Routes>
    <Route path='/'><Home /></Route>
    <Route path='/workSpace'><workSpace /></Route>
   </Routes>
   </>
  )
}

export default App
