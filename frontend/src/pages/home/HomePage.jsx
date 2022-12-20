// REACT
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// COMPONENTS
import Chat from "./components/chat/ChatLog";
import HomePageProfile from "./components/profile/HomePageProfile";
import ReviewsSection from "./components/reviews/ReviewsSection";
import ReviewsSectionHeader from "./components/reviews/ReviewsSectionHeader";
// STYLING
import "./homepage.css";

const HomePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const authorized = localStorage.getItem("authorized");
		if (!authorized) {
			navigate("/account/login");
		}
	}, []);

	return (
		<div className="home-container">
			<HomePageProfile />
			<div>
				<ReviewsSectionHeader />
				<ReviewsSection />
			</div>
			<Chat />
		</div>
	);
};

export default HomePage;
