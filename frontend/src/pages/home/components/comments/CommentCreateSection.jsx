import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../../redux/reducers/CommentSlice";

const CommentCreateSection = ({ reviewID }) => {
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
			<div className="home-reviews-create-comments-section">
				<div>img</div>
				<input
					className="home-reviews-create-comments-section-text-input"
					placeholder="Write a comment..."
					onChange={(event) => {
						setInputComment(event.target.value);
					}}
				/>
				<div></div>
				<button className="button-container" onClick={handleCreateComment}>
					Post Comment
				</button>
			</div>
		</>
	);
};

export default CommentCreateSection;
