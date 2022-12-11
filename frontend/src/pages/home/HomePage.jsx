import React, { useRef, useEffect, useState } from "react";
import FriendsList from "../../components/FriendsList";
import HomePageProfile from "../../components/HomePageProfile";
import ReviewsSection from "../../components/ReviewsSection";
import ReviewsSectionHeader from "../../components/ReviewsSectionHeader";
import "./home-page.css";

const HomePage = () => {
	return (
		<div className="home-container">
			<HomePageProfile />
			<div>
				<ReviewsSectionHeader />
				<ReviewsSection />
				<ReviewsSection />
			</div>
			<FriendsList />
		</div>
	);
};

export default HomePage;
