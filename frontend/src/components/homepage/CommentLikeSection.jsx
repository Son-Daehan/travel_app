import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
	deleteCommentLike,
	likeAComment,
} from "../../redux/reducers/CommentSlice";

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
			console.log(likesByComment[i].user);
			console.log(userInfo.email);

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
		<div>
			{loading ? (
				<div onClick={handleLikeComment}>Like</div>
			) : (
				<div onClick={handleDeleteCommentLike}>DeleteLike</div>
			)}
		</div>
	);
};

export default CommentLikeSection;
