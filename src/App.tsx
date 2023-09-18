







// import { useState } from 'react'

import                      './App.css'
import { Route,
         Routes  }     from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path="/" element={<p>home</p>} />
      <Route path="/about" element={<p>about</p>} />
      </Routes>
    </>
  )
}

export default App
