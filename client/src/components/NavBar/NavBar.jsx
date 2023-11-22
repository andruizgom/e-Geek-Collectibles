import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';


export default function NavBar(props) {
	const { searchByName } = props;
	const navigate = useNavigate();
	const location = useLocation();

	// console.log(cartCount);

	// console.log(parsedCart.map(item) => {item.quantity * 1});
	// console.log(parsedCart);
	// let count = ;

	const route = location.pathname;


	return (
		<nav>
			
			<div>
				<SearchBar searchByName={searchByName} />
			</div>

		
		</nav>
	);
}