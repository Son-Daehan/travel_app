import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages, setMessages } from "../../redux/reducers/ChatSlice";
import { sendMessage } from "../../redux/reducers/ChatSlice";
import axios from "axios";

const ChatPage = ({ user }) => {
	// TO GET THE ROOM NAME
	const { room } = useParams();
	const [text, setText] = useState([]);

	const [socket, setSocket] = useState(null);

	const { userInfo } = useSelector((state) => state.user);
	const { messages, loading } = useSelector((state) => state.chat);

	const dispatch = useDispatch();

	// HAVE THE ONCLOSE HAVE A POST REQUEST SENT TO REDIS STORING CHAT LOG
	// chat.onclose = function (e) {
	// 	console.error("Chat socket closed unexpectedly");
	// };

	// HAVE THE ONOPEN HAVE A GET REQUEST TO GET CHAT LOG FROM REDIS
	// chatSocket.onopen = function (e) {
	// 	console.log("Chat socket has been connected");
	// };

	const sendText = () => {
		const data = {
			room_name: room,
			user: userInfo.email,
			message: text,
		};

		// sends the data to REDIS
		dispatch(sendMessage({ data }));

		// sends the data to the server
		socket.send(
			JSON.stringify({
				message: `${userInfo.email}: ${text}`,
			})
		);
	};

	const getChatLog = async () => {
		const response = await axios.get(`/chat/chat_log/${room}`);
		const data = response.data.data;
		// console.log(data);
		// const messageLog = data.map((msg) => {
		// 	return {
		// 		user: msg.user,
		// 		message: msg.msg,
		// 	};
		// });
		// console.log(messageLog);
		// console.log(messageLog);
		return data;
	};

	// event when a message is sent - socket.send()
	// this will trigger whenever a server sends a message
	// the if statement ensures it does not fire on first load due to null value on socket
	if (socket) {
		socket.onmessage = async (event) => {
			// chat that is sent will be pushed into messages state that holds a history of chat messages for the current state
			// console.log(getChatLog());

			// chat log from REDIS
			// todo - have to change the way data is pulled or sort it to go from oldest to earliest
			const data = await getChatLog();
			console.log(data);
			data.map((msg) =>
				dispatch(
					setMessages({
						user: msg.user,
						message: msg.msg,
					})
				)
			);

			dispatch(setMessages(event.data));
		};
	}

	// create a new websocket connection
	useEffect(() => {
		const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${room}/`);

		setSocket(chatSocket);
	}, []);

	return (
		<>
			{/* CHAT IS NOT LOADING IN TEXTAREA */}
			{/* <textarea id="chat-log" cols="100" rows="20">
				{messages &&
					messages.map((message, i) => {
						return <>{message}</>;
					})}
			</textarea> */}
			<div id="chat-log" cols="100" rows="20">
				{messages &&
					messages.map((message, i) => {
						return <div key={i}>{message.message}</div>;
					})}
			</div>
			<input type="text" onChange={(event) => setText(event.target.value)} />
			<button onClick={sendText}>Send</button>
		</>
	);
};

export default ChatPage;
