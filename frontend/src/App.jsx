import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/account/LoginPage";
import RegisterPage from "./pages/account/RegisterPage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/account/ProfilePage";
import ChatPage from "./pages/chat/ChatPage";
import ChatRoomPage from "./pages//chat/ChatRoomPage";
import axios from "axios";
import TravelInformationPage from "./pages/travel/TravelInformationPage";
import BlogsPage from "./pages/travel/BlogsPage";
import Footer from "./components/Footer";
import CategoryDetailPage from "./pages/travel/CategoryDetailPage";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					{/* HOMEPAGE ROUTE */}
					<Route path="/" element={<HomePage />} />

					{/* TRAVEL ROUTES */}
					<Route
						path="/travel_information"
						element={<TravelInformationPage />}
					/>
					<Route path="/blogs" element={<BlogsPage />} />

					{/* ACCOUNT ROUTES */}
					<Route path="/account/login" element={<LoginPage />} />
					<Route path="/account/register" element={<RegisterPage />} />
					<Route path="/account/profile" element={<ProfilePage />} />

					{/* CHAT ROUTES */}
					<Route path="/chat" element={<ChatPage />} />
					<Route path="/chat/:room" element={<ChatRoomPage />} />
					<Route
						path="/cuisines/categories/:categoryName"
						element={<CategoryDetailPage />}
					/>
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
