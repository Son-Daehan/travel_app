import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk(
	"sendMessage",
	async (data, { rejectWithValue }) => {
		console.log(data.data.room_name);
		try {
			const response = await axios.post(
				`/chat/chat_log/${data.data.room_name}`,
				data.data
			);
			// console.log(response);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const ChatSlice = createSlice({
	name: "chat",
	initialState: {
		messages: [],
		loading: false,
	},
	reducers: {
		setMessages: (state, action) => {
			// console.log(JSON.parse(action.payload));
			console.log("action", action.payload);
			try {
				state.messages.push(JSON.parse(action.payload));
			} catch {
				// for non json data
				state.messages.push(action.payload);
			}
		},
	},
	extraReducers: {
		[sendMessage.pending]: (state, action) => {
			state.loading = true;
		},
		[sendMessage.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[sendMessage.rejected]: (state, action) => {},
	},
});

// export const selectMessages = (state) => state.chat.messages;

export const { setMessages } = ChatSlice.actions;
export default ChatSlice.reducer;
