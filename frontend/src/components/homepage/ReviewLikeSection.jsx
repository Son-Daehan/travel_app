import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteReviewLike,
	likeAReview,
} from "../../redux/reducers/ReviewSlice";

const ReviewLikeSection = ({
	reviewID,
	review_likes,
	displayComments,
	setDisplayComments,
	comments,
}) => {
	const [loading, setLoading] = useState(true);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLikeAReview = () => {
		const data = {
			review_id: reviewID,
			username: userInfo.email,
		};

		dispatch(likeAReview(data));
	};

	const handleDeleteReviewLike = () => {
		const data = {
			review_id: reviewID,
			username: userInfo.email,
		};

		dispatch(deleteReviewLike(data));
	};

	const handleSetDisplayComments = () => {
		if (displayComments) {
			setDisplayComments(false);
		} else if (!displayComments && comments.length > 0) {
			setDisplayComments(true);
		}
	};

	useEffect(() => {
		const likes_by_review = Object.values(review_likes);
		try {
			for (let i = 0; i < likes_by_review.length; i++) {
				if (likes_by_review[i].user === userInfo.email) {
					setLoading(false);

					break;
				}
			}
		} catch {
			setLoading(true);
		}
	}, []);

	return (
		<>
			<div className="home-reviews-likes-comments">
				<div onClick={loading ? handleLikeAReview : handleDeleteReviewLike}>
					{review_likes.length} {review_likes.length > 1 ? "likes" : "like"}
				</div>
				<div onClick={handleSetDisplayComments}>{comments.length} comments</div>
			</div>
			<hr />
		</>
	);
};

export default ReviewLikeSection;
