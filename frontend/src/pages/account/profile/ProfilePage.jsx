import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/reducers/AuthSlice";
import {
	deleteReview,
	getReviewsByUser,
} from "../../../redux/reducers/ReviewSlice";
import "./profilepage.css";

const ProfilePage = () => {
	const [newPassword, setNewPassword] = useState(null);
	const [confirmNewPassword, setConfirmNewPassword] = useState(null);
	const [displayChangePassword, setDisplayChangePassword] = useState(false);

	const { loading, error, success, userInfo } = useSelector(
		(state) => state.user
	);
	const { reviews } = useSelector((state) => state.review);

	const dispatch = useDispatch();

	const handleGetReviewsByUser = () => {
		const data = {
			username: userInfo.email,
		};

		dispatch(getReviewsByUser(data));
	};

	const handleDeleteReview = (reviewID) => {
		const data = {
			review_id: reviewID,
		};

		dispatch(deleteReview(data));
	};

	const handleChangePassword = () => {
		if (newPassword == confirmNewPassword) {
			const data = {
				username: userInfo.email,
				new_password: newPassword,
			};
			dispatch(changePassword(data));
		} else {
			console.log("passwords do not match");
		}
	};

	useEffect(() => {
		handleGetReviewsByUser();
	}, []);

	return (
		<div className="profile-page-container">
			<div className="profile-page-left-wrapper">
				{userInfo && (
					<>
						<div className="profile-page-left-wrapper-left-container">
							<div className="profile-img-container">IMG</div>
							<div className="profile-info-container">
								<div>Email: {userInfo.email}</div>
								<div>First Name: {userInfo.firstName}</div>
								<div>Last Name: {userInfo.lastName}</div>
							</div>
						</div>
						<div className="profile-page-left-wrapper-right-container">
							<div className="profile-about-me-container">ABOUTME</div>
							<div className="profile-change-password-container">
								<button
									className="profile-change-password-btn"
									onClick={() => {
										!displayChangePassword
											? setDisplayChangePassword(true)
											: setDisplayChangePassword(false);
									}}
								>
									Change Password
								</button>
								<div className="profile-change-password-container">
									{displayChangePassword && (
										<>
											<input
												className="password-input"
												placeholder="New Password"
												onChange={(event) => setNewPassword(event.target.value)}
											/>
											<input
												className="password-input"
												placeholder="Confirm New Password"
												onChange={(event) =>
													setConfirmNewPassword(event.target.value)
												}
											/>
											<button
												className="profile-change-password-btn"
												onClick={handleChangePassword}
											>
												Submit
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<div className="profile-page-right-wrapper">
				{reviews ? (
					reviews.map((review) => {
						return (
							<div className="profile-review-container">
								<div>
									Review Title: <em>{review.title}</em>
								</div>
								<button
									className="delete-button"
									onClick={() => handleDeleteReview(review.id)}
								>
									Delete
								</button>
							</div>
						);
					})
				) : (
					<div>
						You have made no reviews... does not work cause reviews is still an
						empty list
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
