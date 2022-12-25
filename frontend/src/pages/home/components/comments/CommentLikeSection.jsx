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
	const [commentLiked, setCommentLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(0);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// SENDS AXIOS REQUEST TO LIKE A COMMENT
	const handleLikeComment = () => {
		const data = {
			comment_id: commentID,
			username: userInfo.email,
		};

		dispatch(likeAComment(data));
		setCommentLiked(true);
		setLikesCount((state) => state + 1);
	};

	// SENDS AXIOS REQUEST TO DELETE A LIKE ON A COMMENT
	const handleDeleteCommentLike = () => {
		const data = {
			comment_id: commentID,
			username: userInfo.email,
		};

		dispatch(deleteCommentLike(data));
		setCommentLiked(false);
		setLikesCount((state) => state - 1);
	};

	// ON PAGE LOAD, DETERMINES IF USER HAS ALREADY LIKED THE COMMENT OR NOT
	useEffect(() => {
		const likesByComment = Object.values(commentLikes);

		for (let i = 0; i < likesByComment.length; i++) {
			if (likesByComment[i].user === userInfo.email) {
				setCommentLiked(true);

				break;
			}
		}
		setLikesCount(commentLikes.length);
	}, []);

	return (
		<div className="comment-like-section-container">
			<div className="comment-like-section-wrapper">
				{!commentLiked ? (
					<button
						className="small-container"
						style={{ backgroundColor: "white" }}
						onClick={handleLikeComment}
					>
						<AiOutlineLike /> {commentLikes.length}{" "}
						{{ likesCount } > 1 ? "Likes" : "Like"}
					</button>
				) : (
					<button
						className="small-container"
						style={{ backgroundColor: "white" }}
						onClick={handleDeleteCommentLike}
					>
						<AiTwotoneLike /> {likesCount}{" "}
						{{ likesCount } > 1 ? "Likes" : "Like"}
					</button>
				)}
			</div>
		</div>
	);
};

export default CommentLikeSection;
