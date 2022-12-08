import "./restaurant.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getRestaurantDetail,
	getRestaurants,
	getUserLocation,
	setCuisine,
} from "../../redux/reducers/RestaurantSlice";
import RestaurantCard from "../../utilities/RestaurantCard";

const RestaurantsPage = () => {
	// const [address, setAddress] = useState(null);
	// const [placeID, setPlaceID] = useState(null);

	const [inputCuisine, setInputCuisine] = useState(null);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const { address, cuisine, restaurants, lat, long } = useSelector(
		(state) => state.restaurants
	);

	const searchRestaurants = async () => {
		// GET USER'S LOCATION BASED ON IP ADDRESS
		await dispatch(getUserLocation());
		// SET THE STATE CUISINE BASED ON THE USER'S INPUT
		// await dispatch(setCuisine({ cuisine: inputCuisine }));
		// GET THE RESTAURANT BASED ON GEOLOCATION AND CUISINE INPUT
		await dispatch(getRestaurants({ lat: lat, long: long }));
		setLoading(true);
	};

	const handleGetRestaurantDetail = (placeID) => {
		dispatch(getRestaurantDetail({ placeID: placeID }));
	};

	useEffect(() => {
		dispatch(getUserLocation());
	}, []);

	// useEffect(() => {
	// 	handleGetRestaurantDetail();
	// }, [placeID]);

	return (
		<div className="restaurants-container">
			<div className="restaurants-top-wrapper">
				<div>
					<p>View different restaurants within your area!</p>
				</div>
				<input
					placeholder="cuisine"
					onChange={(event) => {
						setInputCuisine(event.target.value);
					}}
				/>
				<button onClick={searchRestaurants}>search</button>
			</div>
			<div className="restaurants-bottom-wrapper">
				<div className="restaurants-scroll-container">
					{loading
						? restaurants.map((restaurant) => {
								return (
									<>
										<div
											onClick={() => {
												handleGetRestaurantDetail(restaurant.id);
											}}
										>
											<RestaurantCard restaurant={restaurant} />
											{/* {restaurant.name}
									{restaurant.id} */}
										</div>
									</>
								);
						  })
						: null}
				</div>
				<div className="map-container">
					<img src="https://i.stack.imgur.com/xLP06.png" className="map-img" />
				</div>
			</div>
		</div>
	);
};

export default RestaurantsPage;
