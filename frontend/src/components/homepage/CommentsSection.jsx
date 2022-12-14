import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/reducers/CommentSlice";

const CommentsSection = ({ reviewID, comments }) => {
	const [inputComment, setInputComment] = useState(null);
	const { userInfo } = useSelector((state) => state.user);

	console.log(comments);

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
						<div className="home-reviews-comments-section">{comment.text}</div>
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
