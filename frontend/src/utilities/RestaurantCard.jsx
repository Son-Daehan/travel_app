import "./utilities.css";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant, setSingleRestaurantLocation }) => {
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
				<p>{restaurant.name}</p>
				<div className="restaurant-img-container">
					<img src={restaurant.image_url} className="restaurant-img" />
				</div>
				{/* <p>{restaurant.image_url}</p> */}
				<a href={restaurant.url}>
					<div>Yelp</div>
				</a>
				{/* <p>{restaurant.review_count}</p> */}
				{/* <p>{restaurant.rating}</p> */}
				<p>{restaurant.price}</p>
				<div>
					<p>{restaurant.display_address}</p>
					<p>{restaurant.display_phone}</p>
					<p>{restaurant.distance}</p>
					<Link to={`/blogs/${restaurant.id}`}>View reviews!</Link>
				</div>
			</div>
		</div>
	);
};

export default RestaurantCard;
