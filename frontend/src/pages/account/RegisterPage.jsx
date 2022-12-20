// REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/reducers/AuthSlice";

const RegisterPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { loading, error, success, authorized } = useSelector(
		(state) => state.user
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// axios.defaults.xsrfCookieName = "csrftoken";
	// axios.defaults.xsrfHeaderName = "X-CSRFToken";

	// BUTTON EVENT HANDLER, SENDS AN AXIOS CALL TO BACKEND TO REGISTER USER
	const createUser = () => {
		dispatch(signUp({ firstName, lastName, email, password }));
	};

	// ON PAGE LOAD, IF THE USER IS LOGGED IN, SEND USER TO HOMEPAGE
	useEffect(() => {
		if (authorized) {
			navigate("/");
		}
	}, []);

	// ON SUCCESSFUL REGISTRATION, SEND THE USER TO HOMEPAGE
	useEffect(() => {
		if (success) {
			navigate("/");
		}
	}, [success]);

	return (
		<div className="register-container">
			<input
				type="text"
				placeholder="first name"
				onChange={(event) => setFirstName(event.target.value)}
			/>
			<input
				type="text"
				placeholder="last name"
				onChange={(event) => setLastName(event.target.value)}
			/>
			<input
				type="email"
				placeholder="email"
				onChange={(event) => setEmail(event.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(event) => setPassword(event.target.value)}
			/>
			<button onClick={createUser} disabled={loading}>
				create a user
			</button>
			{error && <div>{error}</div>}
		</div>
	);
};

export default RegisterPage;
