// REDUX
import { useSelector } from "react-redux";
// LEAFLET
import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";
// STYLING
import "./map.css";

const LeafletMap = ({ singleRestaurantLocation }) => {
	const { restaurantsPosition } = useSelector((state) => state.restaurants);
	const { userLocation } = useSelector((state) => state.user);

	return (
		<div className="map-container">
			{restaurantsPosition && (
				<MapContainer
					center={[userLocation.lat, userLocation.long]}
					zoom={10}
					className="map-wrapper med-container"
				>
					<TileLayer
						attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[userLocation.lat, userLocation.long]}>
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
							<Popup>{singleRestaurantLocation.name}</Popup>
						</Marker>
					)}
				</MapContainer>
			)}
		</div>
	);
};

export default LeafletMap;
