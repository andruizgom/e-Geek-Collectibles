import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import './App.css';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/create' element={<Form/>} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
