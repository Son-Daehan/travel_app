import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	address: null,
	lat: null,
	long: null,
	cuisine: null,
};

export const getRestaurants = createAsyncThunk(
	"getRestaurants",
	async (data, { getState, rejectWithValue }) => {
		const state = getState().restaurants;
		console.log(state.lat);
		console.log(state.long);
		try {
			const response = await axios.get(
				`${spoonacular_base_url}?cuisine=${state.cuisine}&lat=${state.lat}&lng=${state.long}&apiKey=${spoonacular_api}`
			);
			console.log(response);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getGeoLocation = createAsyncThunk(
	"getGeoLocation",
	async (data, { rejectWithValue }) => {
		console.log(data);
		try {
			const response = await axios.get(
				`${tomtom_base_url}${data}.json?key=${tomtom_api}`
			);
			console.log(response);
			return response.data.results[0];
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const RestaurantSlice = createSlice({
	name: "restaurants",
	initialState,
	reducers: {
		setAddress: (state, action) => {
			console.log(action.payload);
			state.address = action.payload.address;
		},
		setCuisine: (state, action) => {
			console.log(action.payload);
			state.cuisine = action.payload.cuisine;
		},
	},
	extraReducers: {
		[getRestaurants.pending]: (state) => {},
		[getRestaurants.fulfilled]: (state, action) => {},
		[getRestaurants.rejected]: (state, action) => {},
		[getGeoLocation.pending]: (state) => {},
		[getGeoLocation.fulfilled]: (state, action) => {
			const position = action.payload.position;
			state.lat = position.lat;
			state.long = position.lon;
		},
		[getGeoLocation.rejected]: (state, action) => {
			state.lat = null;
			state.long = null;
		},
	},
});

export const { setAddress, setCuisine } = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
