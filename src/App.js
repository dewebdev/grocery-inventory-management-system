// src/App.js

import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const App = () => {
	const [groceryItems, setGroceryItems] = useState([]);
	const [itemName, setItemName] = useState('');

	useEffect(() => {
		// Fetch all grocery items on component mount
		fetchGroceryItems();
	}, []);

	const fetchGroceryItems = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/grocery-items');
			const data = await response.json();
			setGroceryItems(data);
		} catch (error) {
			console.error('Error fetching grocery items:', error);
		}
	};

	const addGroceryItem = async () => {
		try {
			await fetch('http://localhost:5000/api/grocery-items', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: itemName }),
			});

			// Fetch updated grocery items after adding a new item
			fetchGroceryItems();
			setItemName('');
		} catch (error) {
			console.error('Error adding grocery item:', error);
		}
	};

	return (
		<div className='bg-green-50 min-h-screen'>
			<div className='container mx-auto p-4'>
				<h1 className='text-4xl font-bold mb-4 text-center text-green-800'>
					Grocery Shop
				</h1>
				<div className='mb-4 flex justify-center items-center'>
					<input
						type='text'
						className='border p-2 w-64 sm:w-96 md:w-1/3 rounded-l'
						placeholder='Enter item name'
						value={itemName}
						onChange={(e) => setItemName(e.target.value)}
					/>
					<button
						className='bg-green-600 text-white p-2 rounded-r hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-center'
						onClick={addGroceryItem}
					>
						<FaShoppingCart className='text-xl' />
						<span className='ml-2'>Add Item</span>
					</button>
				</div>
				<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{groceryItems.map((item) => (
						<li
							key={item.id}
							className='bg-white rounded p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105'
						>
							{item.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
