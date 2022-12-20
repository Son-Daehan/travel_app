import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
	deleteCommentLike,
	likeAComment,
} from "../../../../redux/reducers/CommentSlice";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";

const CommentLikeSection = ({ commentID, commentLikes }) => {
	const [loading, setLoading] = useState(true);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLikeComment = () => {
		const data = {
			comment_id: commentID,
			username: userInfo.email,
		};

		dispatch(likeAComment(data));
	};

	useEffect(() => {
		const likesByComment = Object.values(commentLikes);

		for (let i = 0; i < likesByComment.length; i++) {
			if (likesByComment[i].user === userInfo.email) {
				setLoading(false);

				break;
			}
		}
	}, []);

	const handleDeleteCommentLike = () => {
		const data = {
			comment_id: commentID,
			username: userInfo.email,
		};

		dispatch(deleteCommentLike(data));
	};

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
