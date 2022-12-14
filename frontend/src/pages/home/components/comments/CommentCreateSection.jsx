// REACT
import { useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../../redux/reducers/CommentSlice";

const CommentCreateSection = ({ reviewID }) => {
	const [inputComment, setInputComment] = useState(null);
	const { userInfo } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	// BUTTON EVENT HANDLER THAT SENDS AXIOS REQUEST TO CREATE A COMMENT
	const handleCreateComment = () => {
		const data = {
			text: inputComment,
			review_id: reviewID,
			username: userInfo.email,
		};

		dispatch(createComment(data));
		window.location.reload();
	};
	return (
		<>
			<div className="home-reviews-create-comments-section">
				<div>img</div>
				<input
					className="home-reviews-create-comments-section-text-input small-container"
					placeholder="Write a comment..."
					onChange={(event) => {
						setInputComment(event.target.value);
					}}
				/>
				<div></div>
				<button className="small-container" onClick={handleCreateComment}>
					Post Comment
				</button>
			</div>
		</>
	);
};

export default CommentCreateSection;
