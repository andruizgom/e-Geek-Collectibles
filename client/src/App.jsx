import React from "react"
import {Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";

function App() {
 

  return (
    
      <div>
      
      <h1>Vite + React</h1>
     <Routes>
      <Route path="/" element={<NavBar/>}/>
     </Routes>
      </div>
    
  )
}


export default App