// REACT
import { Link, useNavigate } from "react-router-dom";
// AXIOS
import axios from "axios";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/reducers/AuthSlice";
// STYLING
import "./navbar.css";

const Navbar = () => {
	const { authorized } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// BUTTON CLICK EVENT, SENDS AXIOS REQUEST TO BACKEND TO LOG OUT THE USER
	const logout = async () => {
		const response = await axios.post("/api/account/log_out/");
		dispatch(signOut());
		navigate("/account/login");
	};

	return (
		<>
			<nav className="navbar-container">
				<ul className="navbar-wrapper">
					<Link to="/">Home</Link>
					<Link to="/restaurants">Restaurants</Link>
					<Link to="/account/profile">Profile</Link>
					{!authorized && (
						<>
							<Link to="/account/login">Login</Link>
							<Link to="/account/register">Register</Link>
						</>
					)}
					{authorized && (
						<Link onClick={logout} to="/">
							Logout
						</Link>
					)}
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
