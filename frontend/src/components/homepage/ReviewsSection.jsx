import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllReviews } from "../../redux/reducers/ReviewSlice";
import CommentsSection from "./CommentsSection";
import ReviewLikeSection from "./ReviewLikeSection";
import "./reviewssection.css";

const ReviewsSection = () => {
	const dispatch = useDispatch();
	const { reviews } = useSelector((state) => state.review);

	useEffect(() => {
		dispatch(getAllReviews());
	}, []);

	return (
		<div className="home-middle-wrapper">
			{/* <div className="home-reviews-container"> */}
			{reviews &&
				reviews.map((review) => {
					return (
						<div className="home-reviews-container">
							<div className="home-reviews-header">
								<div>Image</div>
								<div>{review.user}</div>
								<div>{review.title}</div>
								<Link to={`/travel_information/${review.restaurant_name}`}>
									{review.restaurant_name}
								</Link>
							</div>
							<hr />
							<p className="home-reviews-description">{review.text}</p>
							<hr />

							<ReviewLikeSection
								reviewID={review.id}
								review_likes={review.review_likes}
							/>

							<CommentsSection
								reviewID={review.id}
								comments={review.comments}
							/>
						</div>
					);
				})}
			{/* </div> */}
		</div>
	);
};

export default ReviewsSection;
