import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Home() {
  return (
    <>
    <Header/>
      <div>
        <h1>CodeSync Home</h1>
        <Link to={'/workspace'}>
          <button>Enter WorkSpace</button>
        </Link>
      </div>
    </>
  )
}

export default Home