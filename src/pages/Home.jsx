import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
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