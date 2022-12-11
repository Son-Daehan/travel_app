import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../redux/reducers/AuthSlice";
import "./navbar.css";

const Navbar = () => {
	// const logout = async () => {
	// 	await axios.post("/account/log_out/");
	// };

	const dispatch = useDispatch();

	const logout = async () => {
		const response = await axios.post("/api/account/log_out/");
		console.log(response.data);
		dispatch(signOut());
	};

	return (
		<>
			<nav className="navbar-container">
				<ul className="navbar-wrapper">
					{/* HOME LINK */}
					<Link to="/">Home</Link>

					{/* TRAVEL LINKS */}
					<Link to="/travel_information">Travel Information</Link>
					<Link to="/blogs">Blogs</Link>

					{/* CHAT LINK */}
					<Link to="/chat">Chat</Link>

					<Link to="/account/profile">Profile</Link>
					<Link to="/account/login">Login</Link>
					<Link to="/account/register">Register</Link>
					<Link onClick={logout} to="/">
						Logout
					</Link>

					{/* ACCOUNT LINKS */}
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
