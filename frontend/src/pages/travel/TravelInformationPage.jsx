import axios from "axios";
import "./travel_information_page.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TravelInformationPage = () => {
	const url = "https://api.spoonacular.com/recipes/complexSearch";

	const params = {
		cuisine: "italian",
		number: 100,
	};

	const getRestaurants = async () => {
		const response = await axios.get(
			`${url}?cuisine=italian?number=50&apiKey=${token}`
		);
		console.log(response.data);
	};

	useEffect(() => {
		getRestaurants();
	}, []);

	return (
		<div className="travel-information">
			<div>
				<div>
					<Link to="/cuisines/categories/African">African</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/American">American</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/British">British</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Cajun">Cajun</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Caribbean">Caribbean</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Chinese">Chinese</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Eastern-European">
						Eastern European
					</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/French">French</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/German">German</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Greek">Greek</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Indian">Indian</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Irish">Irish</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Italian">Italian</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Japanese">Japanese</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Jewish">Jewish</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Korean">Korean</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Latin-American">Latin American</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Mediterranean">Mediterranean</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Mexican">Mexican</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Middle-Eastern">Middle Eastern</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Nordic">Nordic</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Southern">Southern</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Spanish">Spanish</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Thai">Thai</Link>
				</div>
				<div>
					<Link to="/cuisines/categories/Vietnamese">Vietnamese</Link>
				</div>
			</div>
		</div>
	);
};

export default TravelInformationPage;
