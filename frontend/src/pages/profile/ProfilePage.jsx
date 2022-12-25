import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, imageUpload } from "../../redux/reducers/AuthSlice";
import {
	deleteReview,
	getReviewsByUser,
} from "../../redux/reducers/ReviewSlice";
import "./profilepage.css";

const ProfilePage = () => {
	const [newPassword, setNewPassword] = useState(null);
	const [confirmNewPassword, setConfirmNewPassword] = useState(null);
	const [displayChangePassword, setDisplayChangePassword] = useState(false);
	const [image, setImage] = useState(null);

	const { userInfo, profileImg, authorized } = useSelector(
		(state) => state.user
	);
	const { reviews } = useSelector((state) => state.review);
	const navigate = useNavigate();

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
		window.location.reload();
	};

	const handleChangePassword = () => {
		if (newPassword == confirmNewPassword) {
			const data = {
				username: userInfo.email,
				new_password: newPassword,
			};
			dispatch(changePassword(data));
			window.location.reload();
		} else {
			console.log("passwords do not match");
		}
	};

	const handleImageUpload = () => {
		let formData = new FormData();

		formData.append("file", image);

		const data = {
			username: userInfo.email,
			// img_title: image.name,
			img: image,
		};
		console.log(data);

		dispatch(imageUpload(data));
	};

	useEffect(() => {
		if (authorized) {
			handleGetReviewsByUser();
		} else if (!authorized) {
			navigate("/account/login");
		}
	}, []);

	return (
		<div className="profile-page-container">
			<div className="profile-page-left-wrapper large-container">
				{userInfo && (
					<>
						<div className="profile-page-left-wrapper-left-container">
							<div className="profile-img-container large-container">
								{profileImg ? (
									<img className="profile-img" src={profileImg.img_url} />
								) : (
									<div className="profile-img">Upload an image...</div>
								)}
							</div>
							<div className="profile-img-upload-container">
								<label className="img-upload-label extra-extra-small-container">
									Choose an image...
									<input
										className="img-upload-input"
										type="file"
										accept="image/"
										onChange={(event) => setImage(event.target.files[0])}
									/>
								</label>
								<button
									className="upload-button extra-extra-small-container"
									onClick={handleImageUpload}
								>
									Upload
								</button>
							</div>
							{userInfo && (
								<div className="profile-info-container extra-extra-small-container">
									<div>Email: {userInfo.email}</div>
									<div>First Name: {userInfo.firstName}</div>
									<div>Last Name: {userInfo.lastName}</div>
								</div>
							)}
						</div>
						<div className="profile-page-left-wrapper-right-container">
							<div className="profile-about-me-container large-container">
								ABOUTME
							</div>
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
												className="password-input extra-extra-small-container"
												placeholder="New Password"
												onChange={(event) => setNewPassword(event.target.value)}
											/>
											<input
												className="password-input extra-extra-small-container"
												placeholder="Confirm New Password"
												onChange={(event) =>
													setConfirmNewPassword(event.target.value)
												}
											/>
											<button
												className="profile-change-password-btn extra-extra-small-container"
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
			<div className="profile-page-right-wrapper large-container">
				{!reviews ? (
					<div className="profile-review-container">
						You have made no reviews...
					</div>
				) : (
					reviews.map((review) => {
						return (
							<div className="profile-review-container large-container">
								<div>
									Review Title: <em>{review.title}</em>
								</div>
								<button
									className="delete-button extra-extra-small-container"
									onClick={() => handleDeleteReview(review.id)}
								>
									Delete
								</button>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
