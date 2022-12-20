// REACT
import { useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../../../redux/reducers/RestaurantSlice";
// STYLING
import "./restaurantsheader.css";

const ReastaurantsHeader = () => {
	const [inputSearch, setInputSearch] = useState(null);
	const { userLocation } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	// BUTTON EVENT HANDLER THAT SENDS AXIOS REQUEST TO BACKEND WHICH SENDS OUT ANOTHER REQUEST TO YELP'S API
	const handleSearchRestaurants = () => {
		dispatch(
			getRestaurants({
				lat: userLocation.lat,
				long: userLocation.long,
				search: inputSearch,
			})
		);
	};

	return (
		<div className="category-navbar-container">
			<div className="category-navbar-top-wrapper"></div>
			<div className="category-navbar-bottom-wrapper">
				<div>Search for restaurants in you area!</div>
				<div>
					<input
						type="search"
						placeholder="Search"
						className="me-2"
						aria-label="Search"
						onChange={(event) => setInputSearch(event.target.value)}
					/>
					<button
						className="button-container"
						onClick={handleSearchRestaurants}
					>
						Search
					</button>
				</div>
				<div></div>
			</div>
		</div>
	);
};

export default ReastaurantsHeader;
