import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserLocation, signIn } from "../../redux/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./account.css";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { userInfo, hydrate, error } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const loginUser = () => {
		dispatch(signIn({ username, password }));
		dispatch(getUserLocation());
	};

	const navigate = useNavigate();

	useEffect(() => {
		// redirect authenticated user to profile screen
		if (userInfo) {
			navigate("/account/profile");
		}
	}, [navigate, userInfo]);

	return (
		<div className="login-container">
			<input
				type="text"
				placeholder="username"
				onChange={(event) => setUsername(event.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(event) => setPassword(event.target.value)}
			/>
			<button onClick={loginUser}>login</button>
			{error && <div>{error}</div>}
		</div>
	);
};

export default LoginPage;
