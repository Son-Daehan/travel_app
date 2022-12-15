import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/reducers/CommentSlice";
import CommentLikeSection from "./CommentLikeSection";

const CommentsSection = ({ reviewID, comments }) => {
	const [inputComment, setInputComment] = useState(null);
	const { userInfo } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const handleCreateComment = () => {
		const data = {
			text: inputComment,
			review_id: reviewID,
			username: userInfo.email,
		};

		dispatch(createComment(data));
	};

	return (
		<>
			{comments &&
				comments.map((comment) => {
					return (
						<div className="home-reviews-comments-section">
							<div>{comment.user}</div>
							<div>{comment.text}</div>
							<CommentLikeSection
								commentID={comment.id}
								commentLikes={comment.comment_likes}
							/>
						</div>
					);
				})}
			<hr />
			<div className="home-reviews-create-comments-section">
				<div>img</div>
				<input
					placeholder="Write a comment..."
					onChange={(event) => {
						setInputComment(event.target.value);
					}}
				/>
				<button onClick={handleCreateComment}>Post Comment</button>
			</div>
		</>
	);
};

export default CommentsSection;
