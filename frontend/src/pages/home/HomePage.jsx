import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "./map.css";

const HomePage = () => {
	// const mapContainer = useRef(null);
	// const map = useRef(null);
	// const [lng] = useState(139.753);
	// const [lat] = useState(35.6844);
	// const [zoom] = useState(1);
	// const [API_KEY] = useState("4c0553c6869b4ac4966bca7c1149354a");

	// useEffect(() => {
	// 	if (map.current) return; //stops map from intializing more than once
	// 	map.current = new maplibregl.Map({
	// 		container: mapContainer.current,
	// 		style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${API_KEY}`,
	// 		center: [lng, lat],
	// 		zoom: zoom,
	// 	});
	// });

	// const marker = new maplibregl.Marker().setLngLat([lng, lat]).addTo(map);

	return (
		<div className="map-wrap">
			{/* <div ref={mapContainer} className="map"></div> */}
		</div>
	);
};

export default HomePage;
