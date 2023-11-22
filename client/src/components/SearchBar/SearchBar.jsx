import { useState } from 'react';


import { useDispatch } from 'react-redux';
import { searchProducts } from '../../redux/actions/index';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function SearchBar() {
	const [inputValue, setInputValue] = useState(''); // Estado local para el valor del input
	const dispatch = useDispatch();



	const navigate = useNavigate(); // Inicializa Navigate

	const handleInputChange = (e) => {
		e.preventDefault();
		setInputValue(e.target.value); // Actualiza el estado con el valor del input
	};

	const handleSearch = (event) => {
		event.preventDefault();
		dispatch(searchProducts(inputValue))
		.then(() => {
				//navigate('/productList'); // Redirige a la vista de productos después de la búsqueda exitosa
				setInputValue('')
			})
			.catch((error) => {
				console.error('Error en la búsqueda:', error);
			});

		console.log(products);
	};

	return (
		<div>
			<form
				
				onSubmit={handleSearch}>
				<div>
					<input
						type="text"
						name="brand"
						
						placeholder="Producto"
						value={inputValue} // Asigna el valor del estado al input
						onChange={handleInputChange} // Maneja el cambio en el input
					/>
					<button
						type="submit"
						value={'Search'}
						>
						
					</button>
				</div>
			</form>
		</div>
	);
}