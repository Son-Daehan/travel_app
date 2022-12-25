import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk(
	"sendMessage",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`/chat/chat_log/${data.data.room_name}`,
				data.data
			);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getChatLog = createAsyncThunk(
	"getChatLog",
	async (room, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/chat/chat_log/${room}`);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const ChatSlice = createSlice({
	name: "chat",
	initialState: {
		messages: [],
		// roomName: null,
		loading: false,
		chatLogLoading: false,
		roomName: null,
	},
	reducers: {
		setMessages: (state, action) => {
			try {
				state.messages.push(JSON.parse(action.payload));
			} catch {
				// for non json data
				state.messages.push(action.payload);
			}
		},
		setRoomName: (state, action) => {
			try {
				state.roomName = action.payload;
				state.chatLogLoading = true;
			} catch {
				console.log("error");
			}
		},
	},
	extraReducers: {
		[sendMessage.pending]: (state, action) => {
			// state.loading = true;
		},
		[sendMessage.fulfilled]: (state, action) => {
			state.messages.push(action.payload);

			state.loading = false;
		},
		[sendMessage.rejected]: (state, action) => {},

		[getChatLog.pending]: (state, action) => {
			state.chatLogLoading = true;
		},
		[getChatLog.fulfilled]: (state, action) => {
			try {
				state.messages = JSON.parse(action.payload);
			} catch {
				state.messages = action.payload;

				state.chatLogLoading = false;
			}
		},
		[getChatLog.rejected]: (state, action) => {
			state.chatLogLoading = false;
		},
	},
});

export const { setMessages, setRoomName } = ChatSlice.actions;
export default ChatSlice.reducer;
