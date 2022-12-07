import "./travel_information_page.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getGeoLocation,
	getRestaurants,
	setAddress,
	setCuisine,
} from "../../redux/reducers/RestaurantSlice";

const RestaurantsPage = () => {
	// const [address, setAddress] = useState(null);

	const [addressChoice, setAddressChoice] = useState(null);
	const [inputCuisine, setInputCuisine] = useState(null);

	const dispatch = useDispatch();
	const { address, cuisine } = useSelector((state) => state.restaurants);

	const searchRestaurants = async () => {
		await dispatch(setAddress({ address: addressChoice }));
		await dispatch(setCuisine({ cuisine: inputCuisine }));

		await dispatch(getGeoLocation(address));
		await dispatch(getRestaurants());
	};

	return (
		<div className="">
			<input
				placeholder="cuisine"
				onChange={(event) => {
					setInputCuisine(event.target.value);
				}}
			/>
			<input
				placeholder="address"
				onChange={(event) => {
					setAddressChoice(event.target.value);
				}}
			/>
			<button onClick={searchRestaurants}>search</button>
		</div>
	);
};

export default RestaurantsPage;
