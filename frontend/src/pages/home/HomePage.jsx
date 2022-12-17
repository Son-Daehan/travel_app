import Chat from "../../components/chat/ChatLog";
import HomePageProfile from "../../components/homepage/HomePageProfile";
import ReviewsSection from "../../components/homepage/ReviewsSection";
import ReviewsSectionHeader from "../../components/homepage/ReviewsSectionHeader";
import "./homepage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const authorized = localStorage.getItem("hydrate");
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
