import Chat from "../../components/chat/ChatLog";
import HomePageProfile from "../../components/homepage/HomePageProfile";
import ReviewsSection from "../../components/homepage/ReviewsSection";
import ReviewsSectionHeader from "../../components/homepage/ReviewsSectionHeader";
import "./homepage.css";

const HomePage = () => {
	return (
		<div className="home-container">
			<HomePageProfile />
			<div>
				<ReviewsSectionHeader />
				<ReviewsSection />
				<ReviewsSection />
			</div>
			<Chat />
		</div>
	);
};

export default HomePage;
