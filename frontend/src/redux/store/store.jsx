import AuthSlice from "../reducers/AuthSlice";
import ChatSlice from "../reducers/ChatSlice";
import { configureStore } from "@reduxjs/toolkit";
import RestaurantSlice from "../reducers/RestaurantSlice";

const store = configureStore({
	reducer: {
		user: AuthSlice,
		chat: ChatSlice,
		restaurants: RestaurantSlice,
	},
});

export default store;
