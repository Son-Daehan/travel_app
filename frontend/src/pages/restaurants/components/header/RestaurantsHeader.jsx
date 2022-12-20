import React from "react";
import "./restaurantsheader.css";

const ReastaurantsHeader = ({ setInputSearch, handleSearchRestaurants }) => {
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
