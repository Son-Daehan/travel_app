import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	blogs: [],
};

export const getAllBlogs = createAsyncThunk(
	"getAllBlogs",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get("/api/blogs/");
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createBlog = createAsyncThunk(
	"createBlog",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/blogs/", data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const BlogSlice = createSlice({
	name: "blog",
	initialState,
	reducers: {},
	extraReducers: {
		[getAllBlogs.pending]: (state) => {
			state.blogs = [];
		},
		[getAllBlogs.fulfilled]: (state, action) => {
			const blogs_data = action.payload.blogs;
			blogs_data.map((blog) => state.blogs.push(blog));
		},
		[getAllBlogs.rejected]: (state, { payload }) => {},

		[createBlog.pending]: (state) => {},
		[createBlog.fulfilled]: (state, action) => {},
		[createBlog.rejected]: (state, { payload }) => {},
	},
});

// export const { signOut } = AuthSlice.actions;
export default BlogSlice.reducer;
