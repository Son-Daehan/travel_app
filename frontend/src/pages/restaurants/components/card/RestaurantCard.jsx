import "./restaurantcard.css";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant, setSingleRestaurantLocation }) => {
	// BUTTON EVENT HANDLER, SETS THE STATE OF SINGLERESTAURANTLOCATION ON THE RESTAURANTS PAGE
	const handleSetSingleRestaurantLocation = () => {
		const location = {
			lat: restaurant.coordinates.latitude,
			long: restaurant.coordinates.longitude,
		};

		setSingleRestaurantLocation(location);
	};

	return (
		<div
			className="restaurant-card-container"
			onClick={handleSetSingleRestaurantLocation}
		>
			<div className="restaurant-card-wrapper">
				{/* <p>{restaurant.id}</p> */}
				<div className="restaurant-card-wrapper-left">
					<div className="restaurant-img-container">
						<img src={restaurant.image_url} className="restaurant-img" />
					</div>
					<div className="restaurant-name-container">
						<h5>{restaurant.name}</h5>
					</div>
				</div>
				{/* <p>{restaurant.image_url}</p> */}
				<div className="restaurant-card-wrapper-middle">
					<div className="restaurant-card-status-container">
						{!restaurant.is_closed ? "Open" : "Closed"}
					</div>
					{/* <p>{restaurant.review_count}</p> */}
					{/* <p>{restaurant.rating}</p> */}
					<div className="restaurant-card-phone-container">
						<p>{restaurant.display_phone}</p>
					</div>

					<div className="restaurant-card-address-container">
						{restaurant.location.display_address.map((address) => {
							return <div>{address}</div>;
						})}
					</div>
					{/* <p>{restaurant.location.display_address[1]}</p> */}
				</div>
				<div className="restaurant-card-wrapper-right">
					<a href={restaurant.url}>
						<div>Yelp</div>
					</a>
					<div>
						<p>Distance: {restaurant.distance}</p>
					</div>
					<Link to={`/`}>View reviews!</Link>
					<p>{restaurant.price}</p>
				</div>
			</div>
		</div>
	);
};

export default RestaurantCard;
