import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteReview,
	getReviewsByUser,
} from "../../../redux/reducers/ReviewSlice";
import "./profilepage.css";

const ProfilePage = () => {
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

	useEffect(() => {
		handleGetReviewsByUser();
	}, []);

	return (
		<div className="profile-page-container">
			<div className="profile-page-left-wrapper">
				{userInfo && (
					<>
						<div className="profile-page-top-wrapper">
							<div>
								<div className="profile-img-container">IMG</div>
								<div className="profile-info-container">
									<div>{userInfo.email}</div>
									<div>
										{userInfo.firstName} {userInfo.lastName}
									</div>
								</div>
							</div>
							<div>
								<div className="profile-about-me-container">ABOUTME</div>
								<div>Change Password</div>
							</div>
						</div>
						<div className="profile-page-bottom-wrapper"></div>
					</>
				)}
			</div>
			<div className="profile-page-right-wrapper">
				{reviews ? (
					reviews.map((review) => {
						return (
							<div className="profile-review-container">
								<div>{review.title}</div>
								<button onClick={() => handleDeleteReview(review.id)}>
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
