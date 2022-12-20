// REACT
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// REDUX
import {
	getAllReviews,
	getReviewsByUser,
} from "../../../../redux/reducers/ReviewSlice";
// COMPONENTS
import CommentCreateSection from "../comments/CommentCreateSection";
import CommentsSection from "../comments/CommentsSection";
import ReviewLikeSection from "./ReviewLikeSection";
// STYLING
import "./reviewssection.css";

const ReviewsSection = () => {
	const dispatch = useDispatch();

	const { reviews } = useSelector((state) => state.review);
	const { usernameParam } = useParams();
	const [displayComments, setDisplayComments] = useState(false);

	useEffect(() => {
		if (!usernameParam) {
			// AXIOS CALL TO BACKEND TO GET ALL REVIEWS FOR THE HOMEPAGE
			dispatch(getAllReviews());
		} else {
			const data = {
				username: usernameParam,
			};
			// AXIOS CALL TO BACKEND TO GET THE USER'S REVIEWS FOR THEIR PROFILE PAGE
			dispatch(getReviewsByUser(data));
		}
	}, []);

	return (
		<div className="home-middle-wrapper">
			{reviews &&
				reviews.map((review) => {
					return (
						<div className="home-reviews-container">
							<div className="home-reviews-wrapper">
								<div className="home-reviews-header">
									<div className="home-reviews-header-profile-container">
										<div>Image</div>
										{/* LINKS TO USER'S PROFILE PAGE */}
										<Link to={`/profile/${review.user}`}>{review.user}</Link>
									</div>
									<div className="home-reviews-header-title-container">
										<div className="home-reviews-header-title">
											{review.title}
										</div>
										{/* LINKS TO RESTAURANTS PAGE BASED ON THE ITEM CLICKED AS THE SEARCH PARAM */}
										<Link
											className="home-reviews-header-restaurant-name"
											to={`/restaurants/${review.restaurant_name}`}
										>
											{review.restaurant_name}
										</Link>
									</div>
								</div>
								<hr />
								<div>
									<p className="home-reviews-description">{review.text}</p>
								</div>
								{/* HANDLES AND DISPLAYS THE NUMBER OF LIKES AND COMMENTS */}
								<ReviewLikeSection
									reviewID={review.id}
									review_likes={review.review_likes}
									setDisplayComments={setDisplayComments}
									displayComments={displayComments}
									comments={review.comments}
								/>

								{/* HANDLES AND DISPLAYS THE COMMENTS */}
								{review.comments && displayComments && (
									<CommentsSection comments={review.comments} />
								)}
								{/* HANDLES AND DISPLAYS THE CREATE A COMMENT SECTION */}
								<CommentCreateSection reviewID={review.id} />
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default ReviewsSection;
