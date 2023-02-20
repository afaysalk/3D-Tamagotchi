import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ThreeScene from './Scene'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className="App h-screen"></h1>
      <ThreeScene/>
    </div>
  )
}

export default App
