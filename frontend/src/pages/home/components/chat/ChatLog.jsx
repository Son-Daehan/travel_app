import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getChatLog,
	setRoomName,
	sendMessage,
	setMessages,
} from "../../../../redux/reducers/ChatSlice";

import "./chatlog.css";
import { useEffect } from "react";

const ChatLog = ({ user }) => {
	// TO GET THE ROOM NAME
	const [displayChat, setDisplayChat] = useState(false);

	const [text, setText] = useState([]);

	const [socket, setSocket] = useState(null);

	const { userInfo } = useSelector((state) => state.user);
	const { messages, chatLogLoading } = useSelector((state) => state.chat);

	const { userLocation } = useSelector((state) => state.user);

	const dispatch = useDispatch();

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
				// message: `${userInfo.email}: ${text}`,
				user: `${userInfo.email}`,
				msg: `${text}`,
			})
		);
	};

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

	const handleRoomDisconnect = () => {
		try {
			socket.close();
			setSocket(null);
		} catch {
			console.log("Not connected");
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

	useEffect(() => {
		if (displayChat) {
			socket.onmessage = function (e) {
				const data = JSON.parse(e.data);
				dispatch(setMessages({ user: data.user, msg: data.message }));
			};
		}
	}, [displayChat]);

	const bottomRef = useRef(null);

	useEffect(() => {
		if (messages) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="chat-container">
			<div className="chat-wrapper large-container" id="change-this">
				<div onClick={handleDisplayChat} className="chat-header-wrapper">
					<div>
						Chat with people in {userLocation ? userLocation.city : ""}!
					</div>
					<button
						className="extra-extra-small-container"
						onClick={!displayChat ? handleRoomConnect : handleRoomConnect}
					>
						{!displayChat ? "Enter Room" : "Disconnect"}
					</button>
				</div>
				{displayChat && (
					<>
						<hr />
						<div className="chat-log-wrapper">
							{messages &&
								messages.map((message, i) => {
									return (
										<div
											className="chat-log-wrapper-inner"
											style={
												userInfo.email === message.user
													? { "align-items": "flex-end" }
													: { "align-items": "flex-start" }
											}
										>
											<div
												className="chat-message-container extra-extra-small-container"
												id="chat-log"
											>
												<div>
													<em>{message.user}</em>
												</div>
												<div>{message.msg}</div>
											</div>
										</div>
									);
								})}
							<div ref={bottomRef}></div>
						</div>
						<div className="chat-message-wrapper">
							<input
								className="chat-message-input extra-extra-small-container"
								type="text"
								placeholder="Write a message..."
								onChange={(event) => setText(event.target.value)}
							/>
							<button
								className="extra-extra-small-container"
								onClick={sendText}
							>
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
