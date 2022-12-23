// REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUserLocation, signIn } from "../../redux/reducers/AuthSlice";
// STYLING
import "./account.css";
import "./loginpage.css";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { authorized, error } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// BUTTON EVENT HANDLER, SENDS AN AXIOS REQUEST TO BACKEND TO LOGIN
	// ANOTHER AXIOS CALL IS DISPATCHED TO IP-API TO GET A USER'S GEOLOCATION
	const loginUser = () => {
		dispatch(signIn({ username, password }));
		dispatch(getUserLocation());
	};

	// ON PAGE RELOAD, IF USER IS AUTHORIZED, NAVIGATE TO HOMEPAGE
	useEffect(() => {
		if (authorized) {
			navigate("/");
		}
	}, [authorized]);

	return (
		<div className="login-container">
			<div className="login-wrapper">
				<h4>Login</h4>
				<div>
					<em>Username</em>
				</div>
				<input
					type="text"
					placeholder="username"
					onChange={(event) => setUsername(event.target.value)}
				/>
				<div>
					<em>Password</em>
				</div>
				<input
					type="password"
					placeholder="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button onClick={loginUser}>login</button>
				{error && <div>{error}</div>}
			</div>
		</div>
	);
};

export default LoginPage;
