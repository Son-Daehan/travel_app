import "./restaurantspage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getRestaurantDetail,
	getRestaurants,
} from "../../redux/reducers/RestaurantSlice";
import { getUserLocation } from "../../redux/reducers/AuthSlice";
import RestaurantCard from "../../utilities/RestaurantCard";
import ReastaurantsHeader from "../../components/restaurants/RestaurantsHeader";

import LeafletMap from "../../components/restaurants/map/LeafletMap";
import Review from "../../components/restaurants/map/Review";
import { useParams, useNavigate } from "react-router-dom";

const RestaurantsPage = () => {
	const [inputSearch, setInputSearch] = useState(null);
	const [reviewMapDisplay, setReviewMapDisplay] = useState(false);
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
		const authorized = localStorage.getItem("hydrate");
		if (!authorized) {
			navigate("/account/login");
		}
	}, []);

	useEffect(() => {
		console.log(restaurantNameParam);
		if (!userPositionLoading && restaurantNameParam) {
			dispatch(
				getRestaurants({
					lat: userLocation.lat,
					long: userLocation.long,
					search: `${restaurantNameParam}`,
				})
			);
		} else if (!userPositionLoading && !restaurantNameParam) {
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
												/>
											</div>
										</>
									);
								})}
						</div>

						{!reviewMapDisplay ? (
							<LeafletMap
								lat={userLocation.lat}
								long={userLocation.long}
								positions={restaurantsPosition}
								loading={restaurantsLoading}
							/>
						) : (
							<Review setReviewMapDisplay={setReviewMapDisplay} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default RestaurantsPage;
