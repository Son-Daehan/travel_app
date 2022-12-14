import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	comments: [],
};

export const createComment = createAsyncThunk(
	"createComment",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/comments/", data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const likeAComment = createAsyncThunk(
	"likeAComment",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/comments/likes/", data);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteCommentLike = createAsyncThunk(
	"deleteCommentLike",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.delete("/api/comments/likes/delete/", {
				data: data,
			});

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const CommentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {},
	extraReducers: {
		[createComment.pending]: (state) => {},
		[createComment.fulfilled]: (state, action) => {},
		[createComment.rejected]: (state, { payload }) => {},
	},
});

export const {} = CommentSlice.actions;
export default CommentSlice.reducer;
