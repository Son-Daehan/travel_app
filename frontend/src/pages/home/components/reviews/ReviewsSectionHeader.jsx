// REACT
import { useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../../redux/reducers/ReviewSlice";
// STYLING
import "./reviewssection.css";

const ReviewsSectionHeader = () => {
	const [restaurantName, setRestaurantName] = useState(null);
	const [review, setReview] = useState(null);
	const [reviewTitle, setReviewTitle] = useState(null);

	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// BUTTON EVENT HANDLER THAT SENDS AN AXIOS REQUEST TO CREATE A REVIEW
	const handleCreateReview = () => {
		const data = {
			restaurant_name: restaurantName,
			review: review,
			review_title: reviewTitle,
			username: userInfo.email,
		};

		dispatch(createReview(data));
	};

	return (
		<div className="home-create-review-container">
			<div className="home-create-review-top-wrapper">
				<div>Image</div>
				<input
					className="review-title-input"
					placeholder="Review Title"
					onChange={(event) => {
						setReviewTitle(event.target.value);
					}}
				/>
				<div></div>
				<input
					className="review-name-input"
					placeholder="Restaurant Name"
					onChange={(event) => {
						setRestaurantName(event.target.value);
					}}
				/>
			</div>
			<div className="home-create-review-middle-wrapper">
				<input
					className="review-description-input"
					placeholder="Write a review on a restaurant!"
					onChange={(event) => {
						setReview(event.target.value);
					}}
				/>
			</div>
			<div className="home-create-review-bottom-wrapper">
				<button className="button-container" onClick={handleCreateReview}>
					Post Review
				</button>
			</div>
		</div>
	);
};

export default ReviewsSectionHeader;
