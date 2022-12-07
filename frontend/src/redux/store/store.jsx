import AuthSlice from "../reducers/AuthSlice";
import ChatSlice from "../reducers/ChatSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		user: AuthSlice,
		chat: ChatSlice,
	},
});

export default store;
