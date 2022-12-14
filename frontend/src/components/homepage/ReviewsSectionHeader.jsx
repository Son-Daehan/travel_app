import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../redux/reducers/ReviewSlice";
import "./reviewssection.css";

const ReviewsSectionHeader = () => {
	const [restaurantName, setRestaurantName] = useState(null);
	const [review, setReview] = useState(null);
	const [reviewTitle, setReviewTitle] = useState(null);

	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

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
			<div>Image</div>
			<input
				placeholder="Review Title"
				onChange={(event) => {
					setReviewTitle(event.target.value);
				}}
			/>
			<input
				placeholder="Restaurant Name"
				onChange={(event) => {
					setRestaurantName(event.target.value);
				}}
			/>
			<input
				placeholder="Write a review on a restaurant!"
				onChange={(event) => {
					setReview(event.target.value);
				}}
			/>
			<button onClick={handleCreateReview}>Post Review</button>
		</div>
	);
};

export default ReviewsSectionHeader;
