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
	const [loading, setLoading] = useState(true);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// SENDS AXIOS REQUEST TO LIKE A REVIEW
	const handleLikeAReview = () => {
		const data = {
			review_id: reviewID,
			username: userInfo.email,
		};

		dispatch(likeAReview(data));
	};

	// SENDS AXIOS REQUEST TO DELETE A LIKE ON A REVIEW
	const handleDeleteReviewLike = () => {
		const data = {
			review_id: reviewID,
			username: userInfo.email,
		};

		dispatch(deleteReviewLike(data));
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
				<>
					<div className="home-reviews-likes-wrapper">
						{loading ? (
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
						{review_likes.length}
						{review_likes.length > 1 ? <div>Likes</div> : <div>Like</div>}
					</div>
				</>
				<div className="home-reviews-comments-wrapper">
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
