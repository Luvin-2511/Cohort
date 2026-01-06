import { useState } from "react"
import Sample from "./components/Sample"

function App() {
  const [mode, setMode] = useState('Dark')
  const changemode=(newmode)=>{
        setMode(newmode)
    }
  return (
    <>
      <h1>This is {mode} mode</h1>
      <Sample mode={mode} changemode={changemode}/>
    </>
  )
}

export default App
