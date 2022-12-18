import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
	hydrate: JSON.parse(localStorage.getItem("hydrate")) || false,
	loading: false,
	error: null,
	success: false,
	authorized: false,
	userLocation: JSON.parse(localStorage.getItem("userLocation")) || null,
	userPositionLoading: true,
};

export const signUp = createAsyncThunk(
	"signUp",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/account/register/", data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const signIn = createAsyncThunk(
	"signIn",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/account/log_in/", data);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const changePassword = createAsyncThunk(
	"changePassword",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.put("/api/account/password_change/", data);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getUserLocation = createAsyncThunk(
	"getUserLocation",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`http://ip-api.com/json/`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const AuthSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signOut: (state) => {
			localStorage.clear();
			state.loading = false;
			state.userInfo = null;
			state.error = null;
			state.authorized = false;
			state.userLocation = null;
		},
	},
	extraReducers: {
		[signIn.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.authorized = false;
		},
		[signIn.fulfilled]: (state, { payload }) => {
			state.loading = false;
			// THE RESPONSE SENT FROM BACKEND IS AN OBJECT WITH PROPERTIES?? WONT SET TO STATE
			const newUserInfo = {
				email: payload.user_info.email,
				firstName: payload.user_info.first_name,
				lastName: payload.user_info.last_name,
			};
			state.userInfo = newUserInfo;
			localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
			localStorage.setItem("hydrate", JSON.stringify(true));
			// state.sessionID = payload.sessionID;
			state.authorized = true;
		},
		[signIn.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload.message;
			state.authorized = false;
			localStorage.clear();
		},

		// // sign up
		[signUp.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[signUp.fulfilled]: (state, { payload: { error, msg } }) => {
			state.loading = false;
			state.success = true; // registration successful
		},
		[signUp.rejected]: (state, { payload }) => {
			// console.log(action.payload.message);
			state.error = payload.message;
			state.loading = false;
		},
		[getUserLocation.pending]: (state) => {},
		[getUserLocation.fulfilled]: (state, action) => {
			const lat = action.payload.lat;
			const long = action.payload.lon;
			const city = action.payload.city;
			state.userPositionLoading = false;

			const userLocation = {
				lat: lat,
				long: long,
				city: city,
			};
			state.userLocation = userLocation;
			localStorage.setItem("userLocation", JSON.stringify(userLocation));
		},
		[getUserLocation.rejected]: (state, action) => {
			state.userLocation = null;
		},
	},
});

export const { signOut } = AuthSlice.actions;
export default AuthSlice.reducer;
