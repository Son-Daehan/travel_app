import AuthSlice from "../reducers/AuthSlice";
import ChatSlice from "../reducers/ChatSlice";
import { configureStore } from "@reduxjs/toolkit";
import RestaurantSlice from "../reducers/RestaurantSlice";
import ReviewSlice from "../reducers/ReviewSlice";
import CommentSlice from "../reducers/CommentSlice";

const store = configureStore({
	reducer: {
		user: AuthSlice,
		chat: ChatSlice,
		restaurants: RestaurantSlice,
		review: ReviewSlice,
		comment: CommentSlice,
	},
});

export default store;
