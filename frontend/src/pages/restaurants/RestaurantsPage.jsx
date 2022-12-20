import "./restaurantspage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getRestaurantDetail,
	getRestaurants,
} from "../../redux/reducers/RestaurantSlice";
import RestaurantCard from "./components/card/RestaurantCard";
import ReastaurantsHeader from "./components/header/RestaurantsHeader";

import LeafletMap from "./components/map/LeafletMap";
import { useParams, useNavigate } from "react-router-dom";

const RestaurantsPage = () => {
	const [inputSearch, setInputSearch] = useState(null);
	const [reviewMapDisplay, setReviewMapDisplay] = useState(false);
	const [singleRestaurantOnMap, setSingleRestaurantOnMap] = useState(false);
	const [singleRestaurantLocation, setSingleRestaurantLocation] =
		useState(null);
	const { restaurantNameParam } = useParams();
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { restaurants, restaurantsLoading, restaurantsPosition } = useSelector(
		(state) => state.restaurants
	);

	const { lat, long, userLocation, userPositionLoading } = useSelector(
		(state) => state.user
	);

	const handleSearchRestaurants = () => {
		// GET THE RESTAURANT BASED ON GEOLOCATION AND CUISINE INPUT
		dispatch(
			getRestaurants({
				lat: userLocation.lat,
				long: userLocation.long,
				search: inputSearch,
			})
		);
	};

	const handleGetRestaurantDetail = (placeID) => {
		dispatch(getRestaurantDetail({ placeID: placeID }));
		setReviewMapDisplay(true);
	};

	useEffect(() => {
		const authorized = localStorage.getItem("authorized");
		if (!authorized) {
			navigate("/account/login");
		}
	}, []);

	useEffect(() => {
		console.log(restaurantNameParam);
		if (restaurantNameParam) {
			dispatch(
				getRestaurants({
					lat: userLocation.lat,
					long: userLocation.long,
					search: `${restaurantNameParam}`,
				})
			);
		} else if (!restaurantNameParam) {
			dispatch(
				getRestaurants({
					lat: userLocation.lat,
					long: userLocation.long,
					search: "food",
				})
			);
		}
	}, [userPositionLoading]);

	return (
		<>
			<div className="restaurants-container">
				<div className="restaurants-top-container">
					<ReastaurantsHeader
						setInputSearch={setInputSearch}
						handleSearchRestaurants={handleSearchRestaurants}
					/>
				</div>
				<div className="restaurants-bottom-container">
					<div className="restaurants-bottom-wrapper">
						<div className="restaurants-scroll-container">
							{!restaurantsLoading &&
								restaurants.map((restaurant) => {
									return (
										<>
											<div
												onClick={() => {
													handleGetRestaurantDetail(restaurant.id);
												}}
											>
												<RestaurantCard
													restaurant={restaurant}
													setReviewMapDisplay={setReviewMapDisplay}
													singleRestaurantOnMap={singleRestaurantOnMap}
													setSingleRestaurantOnMap={setSingleRestaurantOnMap}
													setSingleRestaurantLocation={
														setSingleRestaurantLocation
													}
												/>
											</div>
										</>
									);
								})}
						</div>

						<LeafletMap
							lat={userLocation.lat}
							long={userLocation.long}
							positions={restaurantsPosition}
							loading={restaurantsLoading}
							singleRestaurantOnMap={singleRestaurantOnMap}
							singleRestaurantLocation={singleRestaurantLocation}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default RestaurantsPage;
