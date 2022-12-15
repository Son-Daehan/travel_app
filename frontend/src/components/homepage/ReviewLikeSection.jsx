import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteReviewLike,
	likeAReview,
} from "../../redux/reducers/ReviewSlice";

const ReviewLikeSection = ({ reviewID, review_likes }) => {
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

	useEffect(() => {
		const likes_by_review = Object.values(review_likes);

		for (let i = 0; i < likes_by_review.length; i++) {
			if (likes_by_review[i].user === userInfo.email) {
				setLoading(false);

				break;
			}
		}
	}, []);

	return (
		<>
			<div className="home-reviews-likes-comments">
				<div>{review_likes.length}</div>
				{review_likes.length > 1 ? <div>likes</div> : <div>like</div>}
				<div>Comments??</div>
			</div>
			<hr />
			<div className="home-reviews-likes-comments-two">
				{loading ? (
					<div onClick={handleLikeAReview}>Like</div>
				) : (
					<div onClick={handleDeleteReviewLike}>DeleteLike</div>
				)}
				<div>Comment</div>
			</div>
		</>
	);
};

export default ReviewLikeSection;
