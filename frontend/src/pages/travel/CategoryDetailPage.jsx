import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const CategoryDetailPage = () => {
	const { categoryName } = useParams();
	const [cuisines, setCuisines] = useState([]);
	// const suggesticToken = "49d97c2edfb97df2911f0999383a29c4e4c6ac84";

	const token = "66575477d7ce44a2b94ecaa2d0369436";
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
