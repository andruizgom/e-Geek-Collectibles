import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import "./App.css";

import NavBar from './components/NavBar/NavBar';

function App() {


  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        
        
        
      </Routes>
    </div>
  );
}


export default App;

