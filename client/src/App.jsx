import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import './App.css';
import Admin from './views/Admin/Admin';
import Orders from './views/Orders/Orders'
import Products from './views/Products/Products'
import Users from './views/Users/Users'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/products' element={<Admin />} />
        <Route path='/admin/orders' element={<Admin/>} />
        <Route path='/admin/users' element={<Admin />} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
