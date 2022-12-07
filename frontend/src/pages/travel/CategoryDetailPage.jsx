import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const CategoryDetailPage = () => {
	const { categoryName } = useParams();
	const [cuisines, setCuisines] = useState([]);

	const url = "https://api.spoonacular.com/recipes/complexSearch";

	const getRestaurants = async () => {
		const response = await axios.get(
			`${url}?cuisine=${categoryName}?number=50&apiKey=${token}`
		);
		console.log(response);
		console.log(response.data);
		setCuisines(response.data.results);
	};

	useEffect(() => {
		getRestaurants();
	}, []);

	return (
		<div>
			{cuisines &&
				cuisines.map((cuisine) => {
					return (
						<div>
							<h1>{cuisine.title}</h1>
							<img src={cuisine.image} />
						</div>
					);
				})}
		</div>
	);
};

export default CategoryDetailPage;
