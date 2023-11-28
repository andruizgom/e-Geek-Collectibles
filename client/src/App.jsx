import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import './App.css';
import Form from './components/Form/Form';
import User from './views/User/User';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const {  isAuthenticated } = useAuth0();
  return (
    <div className="App">
      <Routes>
        <Route path='/create' element={<Form/>} />
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        {isAuthenticated && <Route path="/user" element={<User />} />}
      </Routes>
    </div>
  );
}

export default App;
