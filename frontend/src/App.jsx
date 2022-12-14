import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/account/LoginPage";
import RegisterPage from "./pages/account/RegisterPage";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import axios from "axios";
import Footer from "./components/footer/Footer";
import RestaurantsPage from "./pages/restaurants/RestaurantsPage";

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
					<Route path="/profile/:usernameParam" element={<HomePage />} />

					{/* TRAVEL ROUTES */}
					<Route path="/restaurants" element={<RestaurantsPage />} />
					<Route
						path="/restaurants/:restaurantNameParam"
						element={<RestaurantsPage />}
					/>

					{/* ACCOUNT ROUTES */}
					<Route path="/account/login" element={<LoginPage />} />
					<Route path="/account/register" element={<RegisterPage />} />
					<Route path="/account/profile" element={<ProfilePage />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
