import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	reviews: null,
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

export const deleteReview = createAsyncThunk(
	"deleteReview",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.delete("/api/review/delete/", {
				data: data,
			});
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

			return response.data.reviews;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getReviewsByUser = createAsyncThunk(
	"getReviewsByUser",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`/api/reviews/profile/${data.username}/`
			);

			return response.data.reviews;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const likeAReview = createAsyncThunk(
	"likeAReview",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/reviews/likes/", data);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteReviewLike = createAsyncThunk(
	"deleteReviewLike",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.delete("/api/reviews/likes/delete/", {
				data: data,
			});

			return response.data;
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
		[getAllReviews.pending]: (state) => {
			state.reviews = null;
		},
		[getAllReviews.fulfilled]: (state, action) => {
			state.reviews = action.payload;
		},
		[getAllReviews.rejected]: (state, { payload }) => {
			state.reviews = null;
		},
		[getReviewsByUser.pending]: (state) => {
			state.reviews = null;
		},
		[getReviewsByUser.fulfilled]: (state, action) => {
			state.reviews = action.payload;
		},
		[getReviewsByUser.rejected]: (state, { payload }) => {
			state.reviews = null;
		},
		[createReview.pending]: (state) => {},
		[createReview.fulfilled]: (state, { payload }) => {},
		[createReview.rejected]: (state, { payload }) => {},
	},
});

export const {} = ReviewSlice.actions;
export default ReviewSlice.reducer;
