import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../redux/reducers/ReviewSlice";
import CommentsSection from "./CommentsSection";
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
								<div>{review.restaurant_name}</div>
							</div>
							<hr />
							<p className="home-reviews-description">{review.text}</p>
							<hr />
							<div className="home-reviews-likes-comments">
								<div># of likes</div>
								<div>Comments??</div>
							</div>
							<hr />
							<div className="home-reviews-likes-comments-two">
								<div>Like</div>
								<div>Comment</div>
							</div>

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
