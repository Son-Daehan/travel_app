// REACT
import { useState, useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
	deleteCommentLike,
	likeAComment,
} from "../../../../redux/reducers/CommentSlice";
// ICONS
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";

const CommentLikeSection = ({ commentID, commentLikes }) => {
	const [loading, setLoading] = useState(true);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// SENDS AXIOS REQUEST TO LIKE A COMMENT
	const handleLikeComment = () => {
		const data = {
			comment_id: commentID,
			username: userInfo.email,
		};

		dispatch(likeAComment(data));
	};

	// SENDS AXIOS REQUEST TO DELETE A LIKE ON A COMMENT
	const handleDeleteCommentLike = () => {
		const data = {
			comment_id: commentID,
			username: userInfo.email,
		};

		dispatch(deleteCommentLike(data));
	};

	// ON PAGE LOAD, DETERMINES IF USER HAS ALREADY LIKED THE COMMENT OR NOT
	useEffect(() => {
		const likesByComment = Object.values(commentLikes);

		for (let i = 0; i < likesByComment.length; i++) {
			if (likesByComment[i].user === userInfo.email) {
				setLoading(false);

				break;
			}
		}
	}, []);

	return (
		<div className="comment-like-section-container">
			<div className="comment-like-section-wrapper">
				{loading ? (
					<button
						className="comment-like-section-like-button"
						style={{ backgroundColor: "white" }}
						onClick={handleLikeComment}
					>
						<AiOutlineLike /> {commentLikes.length}{" "}
						{commentLikes.length > 1 ? "Likes" : "Like"}
					</button>
				) : (
					<button
						className="comment-like-section-like-button"
						style={{ backgroundColor: "white" }}
						onClick={handleDeleteCommentLike}
					>
						<AiTwotoneLike /> {commentLikes.length}{" "}
						{commentLikes.length > 1 ? "Likes" : "Like"}
					</button>
				)}
			</div>
		</div>
	);
};

export default CommentLikeSection;
