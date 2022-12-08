import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
	const getRestaurants = async () => {
		const response = await axios("/api/google/");
		console.log(JSON.stringify(response.data));
	};

	useEffect(() => {
		getRestaurants();
	}, []);

	return (
		<div className="map-wrap">
			{/* <div ref={mapContainer} className="map"></div> */}
		</div>
	);
};

export default HomePage;
