import React from 'react';
import logo from '../../assets/logo.svg';

const Banner = () => {
  return (
    <div className="flex items-center justify-center h-44  p-4 bg-red-600">
      <img src={logo} alt="Logo" className="h-60 w-auto" />
      <div className="ml-2">
        <h1 className="text-6xl font-bold font-sans">e-Geek Store</h1>
        <p className="mt-1 text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          eos!
        </p>
      </div>
    </div>
  );
};

export default Banner;
