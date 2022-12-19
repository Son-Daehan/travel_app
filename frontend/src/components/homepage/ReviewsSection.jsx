import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
	getAllReviews,
	getReviewsByUser,
} from "../../redux/reducers/ReviewSlice";
import CommentCreateSection from "./CommentCreateSection";
import CommentsSection from "./CommentsSection";
import ReviewLikeSection from "./ReviewLikeSection";
import "./reviewssection.css";

const ReviewsSection = () => {
	const dispatch = useDispatch();
	const { reviews } = useSelector((state) => state.review);

	const { usernameParam } = useParams();

	const [displayComments, setDisplayComments] = useState(false);

	useEffect(() => {
		if (!usernameParam) {
			dispatch(getAllReviews());
		} else {
			const data = {
				username: usernameParam,
			};
			dispatch(getReviewsByUser(data));
		}
	}, []);

	return (
		<div className="home-middle-wrapper">
			{/* <div className="home-reviews-container"> */}
			{reviews &&
				reviews.map((review) => {
					return (
						<div className="home-reviews-container">
							<div className="home-reviews-wrapper">
								<div className="home-reviews-header">
									<div className="home-reviews-header-profile-container">
										<div>Image</div>
										<Link to={`/profile/${review.user}`}>{review.user}</Link>
									</div>
									<div className="home-reviews-header-title-container">
										<div className="home-reviews-header-title">
											{review.title}
										</div>
										<Link
											className="home-reviews-header-restaurant-name"
											to={`/travel_information/${review.restaurant_name}`}
										>
											{review.restaurant_name}
										</Link>
									</div>
								</div>
								<hr />
								<div>
									<p className="home-reviews-description">{review.text}</p>
								</div>
								<ReviewLikeSection
									reviewID={review.id}
									review_likes={review.review_likes}
									setDisplayComments={setDisplayComments}
									displayComments={displayComments}
									comments={review.comments}
								/>

								{review.comments && displayComments && (
									<CommentsSection comments={review.comments} />
								)}
								<CommentCreateSection reviewID={review.id} />
							</div>
						</div>
					);
				})}
			{/* </div> */}
		</div>
	);
};

export default ReviewsSection;
