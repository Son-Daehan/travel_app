// REACT
import { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
	deleteReviewLike,
	likeAReview,
} from "../../../../redux/reducers/ReviewSlice";
// ICONS
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";

const ReviewLikeSection = ({
	reviewID,
	review_likes,
	displayComments,
	setDisplayComments,
	comments,
}) => {
	const [reviewLiked, setReviewLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(0);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// SENDS AXIOS REQUEST TO LIKE A REVIEW
	const handleLikeAReview = () => {
		const data = {
			review_id: reviewID,
			username: userInfo.email,
		};

		dispatch(likeAReview(data));
		setReviewLiked(true);
		setLikesCount((state) => state + 1);
	};

	// SENDS AXIOS REQUEST TO DELETE A LIKE ON A REVIEW
	const handleDeleteReviewLike = () => {
		const data = {
			review_id: reviewID,
			username: userInfo.email,
		};

		dispatch(deleteReviewLike(data));
		setReviewLiked(false);
		setLikesCount((state) => state - 1);
	};

	// EVENT HANDLE FOR WHEN BUTTON IS CLICKED, SETS THE DISPLAYCOMMENTS TO TRUE WHICH DISPLAYS THE COMMENTS
	const handleSetDisplayComments = () => {
		if (displayComments) {
			setDisplayComments(false);
		} else if (!displayComments && comments.length > 0) {
			setDisplayComments(true);
		}
	};

	// ON PAGE LOAD, DETERMINES IF USER HAS ALREADY LIKED THE REVIEW POST OR NOT
	useEffect(() => {
		const likes_by_review = Object.values(review_likes);

		for (let i = 0; i < likes_by_review.length; i++) {
			if (likes_by_review[i].user === userInfo.email) {
				setReviewLiked(true);

				break;
			}
		}
		setLikesCount(review_likes.length);
	}, []);

	return (
		<>
			<div className="home-reviews-likes-comments">
				<>
					<div className="home-reviews-likes-wrapper small-container">
						{!reviewLiked ? (
							<button
								onClick={handleLikeAReview}
								style={{ backgroundColor: "white" }}
							>
								<AiOutlineLike />
							</button>
						) : (
							<button
								onClick={handleDeleteReviewLike}
								style={{ backgroundColor: "white" }}
							>
								<AiTwotoneLike />
							</button>
						)}
						{likesCount}
						{likesCount > 1 ? <div>Likes</div> : <div>Like</div>}
					</div>
				</>
				<div className="home-reviews-comments-wrapper small-container">
					<div onClick={handleSetDisplayComments}>
						{comments.length} Comments
					</div>
				</div>
			</div>
			<hr />
		</>
	);
};

export default ReviewLikeSection;
