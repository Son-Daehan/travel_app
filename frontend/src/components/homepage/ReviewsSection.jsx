import React from "react";
import "./reviewssection.css";

const ReviewsSection = () => {
	return (
		<div className="home-middle-wrapper">
			<div className="home-reviews-container">
				<div className="home-reviews-header">
					<div>Image</div>
					<div>Name</div>
				</div>
				<hr />
				<p className="home-reviews-description">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil optio
					molestias quia molestiae aperiam itaque consequuntur, earum, ullam
					provident magni quo id pariatur! Dolor, quidem!
				</p>
				<hr />
				<div className="home-reviews-likes-comments">
					<div># of likes</div>
					<div>Comments??</div>
				</div>
				<hr />
				<div className="home-reviews-likes-comments-two">
					<div>Like</div>
					<div>Comment</div>
				</div>
				<div className="home-reviews-comments-section">
					Comments if there are any comments
				</div>
				<hr />
				<div className="home-reviews-create-comments-section">
					<div>img</div>
					<input placeholder="Write a comment..." />
				</div>
			</div>
		</div>
	);
};

export default ReviewsSection;
