import React from "react";
import "./friends-list.css";

const FriendsList = () => {
	return (
		<div className="friends-list-container">
			<div className="friends-list-wrapper">
				<div className="friends-list-header-wrapper">
					<div>Chat with people around you!</div>
				</div>
				<hr />
				<div className="friends-list-contacts-wrapper">
					<div>img</div>
					<div>NAME</div>
				</div>
			</div>
		</div>
	);
};

export default FriendsList;
