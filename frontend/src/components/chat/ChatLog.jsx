import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getChatLog,
	setMessages,
	setRoomName,
} from "../../redux/reducers/ChatSlice";
import { sendMessage } from "../../redux/reducers/ChatSlice";
import axios from "axios";
import "./chatlog.css";
import { useEffect } from "react";

const ChatLog = ({ user }) => {
	// TO GET THE ROOM NAME
	const [inputRoomName, setInputRoomName] = useState(null);
	const [displayChat, setDisplayChat] = useState(false);

	const [text, setText] = useState([]);

	const [socket, setSocket] = useState(null);

	const { userInfo } = useSelector((state) => state.user);
	const { messages, loading, chatLogLoading, roomName } = useSelector(
		(state) => state.chat
	);

	const { userLocation } = useSelector((state) => state.user);

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
			room_name: userLocation.city,
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

	// const getChatLog = async () => {
	// 	const response = await axios.get(`/chat/chat_log/${inputRoomName}`);
	// 	const data = response.data.data;
	// 	console.log(inputRoomName);
	// 	// console.log(data);
	// 	// const messageLog = data.map((msg) => {
	// 	// 	return {
	// 	// 		user: msg.user,
	// 	// 		message: msg.msg,
	// 	// 	};
	// 	// });
	// 	// console.log(messageLog);
	// 	// console.log(messageLog);
	// 	return data;
	// };
	// if (socket) {
	// 	socket.onOpen = async () => {
	// 		const response = await axios.get(`/chat/chat_log/${inputRoomName}`);
	// 		console.log(inputRoomName);
	// 		const data = response.data.data;
	// 		console.log(response);
	// 		// console.log(data);
	// 		// const messageLog = data.map((msg) => {
	// 		// 	return {
	// 		// 		user: msg.user,
	// 		// 		message: msg.msg,
	// 		// 	};
	// 		// });
	// 		// console.log(messageLog);
	// 		// console.log(messageLog);
	// 		return data;
	// 	};
	// }

	// event when a message is sent - socket.send()
	// this will trigger whenever a server sends a message
	// the if statement ensures it does not fire on first load due to null value on socket
	// useEffect(() => {
	// 	if (chatLogLoading) {
	// 		socket.onmessage = async (event) => {
	// 			// chat that is sent will be pushed into messages state that holds a history of chat messages for the current state
	// 			// console.log(getChatLog());

	// 			// chat log from REDIS
	// 			// todo - have to change the way data is pulled or sort it to go from oldest to earliest
	// 			const data = await getChatLog();
	// 			console.log(data);
	// 			data.map((msg) =>
	// 				dispatch(
	// 					setMessages({
	// 						user: msg.user,
	// 						message: msg.msg,
	// 					})
	// 				)
	// 			);

	// 			dispatch(setMessages(event.data));
	// 		};
	// 	}
	// }, [chatLogLoading]);

	useEffect(() => {
		if (chatLogLoading) {
			dispatch(getChatLog(userLocation.city));
		}
	}, [chatLogLoading]);

	const handleRoomConnect = () => {
		try {
			const chatSocket = new WebSocket(
				`ws://localhost:8000/ws/chat/${userLocation.city}/`
			);
			setSocket(chatSocket);
			dispatch(setRoomName(userLocation.city));
		} catch {
			console.log("No room input");
		}
	};

	const handleDisplayChat = () => {
		if (displayChat) {
			setDisplayChat(false);
			document.getElementById("change-this").classList.remove("changed");
		} else {
			setDisplayChat(true);
			document.getElementById("change-this").classList.add("changed");
		}
	};

	return (
		<div className="chat-container">
			<div className="chat-wrapper" id="change-this">
				<div onClick={handleDisplayChat} className="chat-header-wrapper">
					<div>
						Chat with people in {userLocation ? userLocation.city : ""}!
					</div>
					<button className="chat-button" onClick={handleRoomConnect}>
						Enter room
					</button>
				</div>
				{displayChat && (
					<>
						<hr />
						<div className="chat-log-wrapper">
							<hr />
							<div className="chat-log-wrapper-inner">
								{messages &&
									messages.map((message, i) => {
										return (
											<div
												key={i}
												className={
													userInfo.email === message.user
														? "user-chat-setting"
														: ""
												}
											>
												<div className="chat-message-setting">
													<div>
														<em>User: {message.user}</em>
													</div>
													<div>{message.msg}</div>
												</div>
											</div>
										);
									})}
							</div>
						</div>
						<div className="chat-message-wrapper">
							<input
								type="text"
								placeholder="Write a message..."
								onChange={(event) => setText(event.target.value)}
							/>
							<button className="chat-button" onClick={sendText}>
								Send
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ChatLog;
