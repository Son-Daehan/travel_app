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

	const { userInfo, profileImg } = useSelector((state) => state.user);
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
		window.location.reload();
	};

	return (
		<div className="home-create-review-container med-container">
			<div className="home-create-review-top-wrapper">
				<div className="review-profile-img-container med-container-no-radius">
					{profileImg ? (
						<img className="review-profile-img" src={profileImg.img_url} />
					) : (
						<div>Upload an image...</div>
					)}
				</div>
				<input
					className="review-title-input small-container"
					placeholder="Review Title"
					onChange={(event) => {
						setReviewTitle(event.target.value);
					}}
				/>
				<div></div>
				<input
					className="review-name-input small-container"
					placeholder="Restaurant Name"
					onChange={(event) => {
						setRestaurantName(event.target.value);
					}}
				/>
			</div>
			<div className="home-create-review-middle-wrapper">
				<input
					className="review-description-input small-container"
					placeholder="Write a review on a restaurant!"
					onChange={(event) => {
						setReview(event.target.value);
					}}
				/>
			</div>
			<div className="home-create-review-bottom-wrapper">
				<button className="small-container" onClick={handleCreateReview}>
					Post Review
				</button>
			</div>
		</div>
	);
};

export default ReviewsSectionHeader;
