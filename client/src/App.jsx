//import style from './App.module.css';
//import Detail from './views/Detail/Detail';
import Landing from './views/Landing/Landing';
//import NavBar from './components/NavBar/NavBar';
import { useLocation, Routes, Route } from 'react-router-dom';
//import Footer from './components/Footer/Footer';

//import Favorites from './components/Favorites/Favorites';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { setUserData } from './redux/actions/index';
import AdminDashboard from './views/Admin/AdminDashboard/AdminDashboard';
import axios from 'axios';

function App() {
	const location = useLocation();
	const route = location.pathname.slice(1);
	const dispatch = useDispatch();
	// const cartCount = localStorage.getItem('cartCount');
	// console.log(cartCount);


		// const storedFav = localStorage.getItem('user');
		// if (storedFav) {
		// 	const parsedFav = JSON.parse(storedFav);
		// 	dispatch(setUserData(parsedFav));
		// }

		// dispatch(setCartCount(cartCount));


	const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es administrador

	useEffect(() => {
		const checkAdminStatus = async () => {
			try {
				const token = localStorage.getItem('token');
				if (token) {
					const adminResponse = await axios.get('/login/admin-panel', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (adminResponse.data) {
						const res = adminResponse.data;
						setIsAdmin(res.data === 'Panel Administracion');
					} else {
						console.error('error');
					}
				}
			} catch (error) {
				console.error('Error al verificar el estado de administrador:', error);
				setIsAdmin(false); // Manejo de error, se asume que el usuario no es administrador
			}
		};

		checkAdminStatus();
	}, []);

	return (
		<div>
			

			{isAdmin ? ( // Muestra si el usuario es administrador
				<Routes>
					{
						<Route
							path="/"
							element={<Landing />}
						/> /* Agrega aquí las rutas y componentes para administradores */
					}
				</Routes>
			) : (
				<Routes>
					<Route
						path="/"
						element={<Landing />}
					/>
					<Route
						path="/product/:id"
						element={<Detail />}
					/>
					<Route
						path="/"
						element={<NavBar />}
					/>
				
					{/* <Route
						path="/editproduct"
						element={<EditProduct />}
					/> */}
					
				
				
					<Route
						path="/favorites"
						element={<Favorites />}
					/>
					
					
					<Route
						path="/admin"
						element={<AdminDashboard />}
					/>

					
					
					
				</Routes>
			)}
			
		</div>
	);
}
export default App;