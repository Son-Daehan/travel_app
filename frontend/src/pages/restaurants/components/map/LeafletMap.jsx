import React from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { useSelector } from "react-redux";
import "./map.css";
// import "leaflet/dist/leaflet.css";
// import icon from '../../node_modules/leaflet/dist/images/marker-icon.png'
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import { Icon } from "leaflet";

const LeafletMap = ({ lat, long, positions, singleRestaurantLocation }) => {
	const { restaurantsPosition } = useSelector((state) => state.restaurants);

	return (
		<div className="map-container">
			{lat && (
				<MapContainer center={[lat, long]} zoom={10} className="map-wrapper">
					<TileLayer
						attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[lat, long]}>
						<Popup>You are here!</Popup>
					</Marker>
					;
					{!singleRestaurantLocation ? (
						restaurantsPosition.map((restaurant) => {
							return (
								<Marker position={[restaurant.lat, restaurant.long]}>
									<Popup>{restaurant.name}</Popup>
								</Marker>
							);
						})
					) : (
						<Marker
							position={[
								singleRestaurantLocation.lat,
								singleRestaurantLocation.long,
							]}
						>
							<Popup>It's working!</Popup>
						</Marker>
					)}
				</MapContainer>
			)}
		</div>
	);
};

export default LeafletMap;
