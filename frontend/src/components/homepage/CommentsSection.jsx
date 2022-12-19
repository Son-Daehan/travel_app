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
		<div className="home-reviews-comments-section-container">
			{comments &&
				comments.map((comment) => {
					return (
						<div className="home-reviews-commits-section-wrapper">
							<div className="home-reviews-comments-section-top-wrapper">
								<div className="home-reviews-comments-section-user">
									{comment.user}
								</div>
								<div></div>
								<div className="home-reviews-comments-section-text">
									{comment.text}
								</div>
							</div>
							<div className="home-reviews-comments-section-bottom-wrapper">
								<CommentLikeSection
									commentID={comment.id}
									commentLikes={comment.comment_likes}
								/>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default CommentsSection;
