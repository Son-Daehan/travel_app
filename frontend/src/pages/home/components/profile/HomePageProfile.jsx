import { useSelector } from "react-redux";
import "./homepageprofile.css";

const HomePageProfile = () => {
	const { userInfo, profileImg } = useSelector((state) => state.user);

	return (
		<div className="home-page-profile-container">
			<div className="home-page-profile-wrapper">
				<div className="home-page-profile-inner-wrapper">
					<div className="profile-img-container med-container">
						{profileImg ? (
							<img className="profile-img" src={profileImg.img_url} />
						) : (
							<div className="profile-img">Upload an image..</div>
						)}
					</div>
					<div className="profile-name-container large-container">
						{userInfo && (
							<h5>
								{userInfo.firstName} {userInfo.lastName}
							</h5>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePageProfile;
