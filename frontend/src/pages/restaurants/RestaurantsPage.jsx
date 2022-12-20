// REACT
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
	getRestaurantDetail,
	getRestaurants,
} from "../../redux/reducers/RestaurantSlice";
// COMPONENTS
import RestaurantCard from "./components/card/RestaurantCard";
import ReastaurantsHeader from "./components/header/RestaurantsHeader";
import LeafletMap from "./components/map/LeafletMap";
// STYLING
import "./restaurantspage.css";

const RestaurantsPage = () => {
	const [singleRestaurantLocation, setSingleRestaurantLocation] =
		useState(null);
	const { restaurants, restaurantsLoading } = useSelector(
		(state) => state.restaurants
	);
	const { userLocation } = useSelector((state) => state.user);
	const { restaurantNameParam } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// BUTTON EVENT HANDLER THAT PLACES A MARKER ON THE MAP BASED ON THE RESTAURANT CARD THE USER CLICKS
	const handleGetRestaurantDetail = (placeID) => {
		dispatch(getRestaurantDetail({ placeID: placeID }));
	};

	useEffect(() => {
		// ON PAGE LOAD, DIRECT THE USER TO LOGIN PAGE IF NOT AUTHORIZED
		const authorized = localStorage.getItem("authorized");
		if (!authorized) {
			navigate("/account/login");
		}

		// ON PAGE LOAD, IF A USER CLICKED ON A RESTAURANT NAME SEARCH PARAM FROM HOMEPAGE
		// USE THE PARAM, IF NOT, LOAD A GENERIC FOOD SEARCH
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
	}, []);

	return (
		<>
			<div className="restaurants-container">
				<div className="restaurants-top-container">
					<ReastaurantsHeader />
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
													setSingleRestaurantLocation={
														setSingleRestaurantLocation
													}
												/>
											</div>
										</>
									);
								})}
						</div>

						<LeafletMap singleRestaurantLocation={singleRestaurantLocation} />
					</div>
				</div>
			</div>
		</>
	);
};

export default RestaurantsPage;
