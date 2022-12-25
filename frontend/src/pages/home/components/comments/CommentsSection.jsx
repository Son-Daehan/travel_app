// COMPONENTS
import CommentLikeSection from "./CommentLikeSection";
// STYLING
import "./commentssection.css";

const CommentsSection = ({ comments }) => {
	return (
		<div className="home-reviews-comments-section-container small-container">
			{comments &&
				comments.map((comment) => {
					return (
						<div className="home-reviews-commits-section-wrapper">
							<div className="home-reviews-comments-section-top-wrapper">
								<div className="home-reviews-comments-section-user extra-small-container">
									{comment.user}
								</div>
								<div></div>
								<div className="home-reviews-comments-section-text small-container">
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
