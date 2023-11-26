import React from 'react';
import Banner from '../../components/Banner/Banner';
import SearchBar from '../../components/SearchBar/SearchBar';
import Categories from '../../components/Categories/Categories';
import Footer from '../../components/Footer/Footer';

const Landing = () => {
  return (
    <div>
      <Banner />
      <SearchBar />
      <Categories />
      <Footer/>
    </div>
  );
};

export default Landing;
