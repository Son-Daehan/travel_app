import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	address: null,
	lat: null,
	long: null,
	cuisine: null,
	restaurants: null,
	restaurant: null,
	userPositionLoading: true,
	restaurantsLoading: true,
	restaurantsPosition: [],
};

export const getRestaurantDetail = createAsyncThunk(
	"getRestaurantDetail",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/restaurants/${data.placeID}/`);
			// console.log(response);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const getRestaurants = createAsyncThunk(
	"getRestaurants",
	async (data, { rejectWithValue }) => {
		console.log(data);
		// console.log(user_location);
		const user_location = {
			lat: data.lat,
			long: data.long,
			search: data.search,
		};
		// console.log(user_location);
		try {
			const response = await axios.post(`/api/restaurants/`, user_location);
			// console.log(response);
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

const RestaurantSlice = createSlice({
	name: "restaurants",
	initialState,
	reducers: {
		setCuisine: (state, action) => {
			console.log(action.payload);
			state.cuisine = action.payload.cuisine;
		},
	},
	extraReducers: {
		[getRestaurants.pending]: (state) => {
			state.restaurants = null;
			state.restaurantsLoading = true;
		},
		[getRestaurants.fulfilled]: (state, action) => {
			// action.payload.restaurants.map((restaurant) => {
			// 	state.restaurants.push(restaurant);
			// });
			state.restaurants = action.payload.restaurants;
			state.restaurantsLoading = false;
			action.payload.restaurants.map((restaurant) => {
				console.log(restaurant.coordinates);
				state.restaurantsPosition.push({
					lat: restaurant.coordinates.latitude,
					long: restaurant.coordinates.longitude,
				});
			});
		},
		[getRestaurants.rejected]: (state, action) => {},

		[getRestaurantDetail.pending]: (state) => {
			state.restaurant = null;
		},

		[getRestaurantDetail.fulfilled]: (state, action) => {
			state.restaurant = action.payload.restaurant;
		},

		[getRestaurantDetail.rejected]: (state, action) => {},

		[getUserLocation.pending]: (state) => {},
		[getUserLocation.fulfilled]: (state, action) => {
			// console.log(action.payload);
			state.lat = action.payload.lat;
			state.long = action.payload.lon;
			state.userPositionLoading = false;
		},
		[getUserLocation.rejected]: (state, action) => {
			state.lat = null;
			state.long = null;
		},
	},
});

export const { setAddress, setCuisine } = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
