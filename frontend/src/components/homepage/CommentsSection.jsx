import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/reducers/CommentSlice";
import CommentLikeSection from "./CommentLikeSection";
import "./commentssection.css";

const CommentsSection = ({ comments }) => {
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
		</>
	);
};

export default CommentsSection;
