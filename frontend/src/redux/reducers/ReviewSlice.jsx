import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	reviews: [],
};

export const createReview = createAsyncThunk(
	"createReview",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/reviews/", data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getAllReviews = createAsyncThunk(
	"getAllReviews",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get("/api/reviews/", data);

			// console.log(response.data.reviews);

			return response.data.reviews;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const ReviewSlice = createSlice({
	name: "review",
	initialState,
	reducers: {},
	extraReducers: {
		[getAllReviews.pending]: (state) => {},
		[getAllReviews.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.reviews = action.payload;
		},
		[getAllReviews.rejected]: (state, { payload }) => {},
		[createReview.pending]: (state) => {},
		[createReview.fulfilled]: (state, { payload }) => {},
		[createReview.rejected]: (state, { payload }) => {},
	},
});

export const {} = ReviewSlice.actions;
export default ReviewSlice.reducer;
