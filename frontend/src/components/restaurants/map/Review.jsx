import React from "react";

const Review = ({ setReviewMapDisplay }) => {
	return (
		<div>
			<button
				onClick={() => {
					setReviewMapDisplay(false);
				}}
			>
				X
			</button>
		</div>
	);
};

export default Review;
