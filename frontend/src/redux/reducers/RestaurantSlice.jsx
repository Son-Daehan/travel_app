import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	address: null,
	cuisine: null,
	restaurants: null,
	restaurant: null,
	restaurantsLoading: true,
	restaurantsPosition: [],
};

export const getRestaurantDetail = createAsyncThunk(
	"getRestaurantDetail",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/restaurants/${data.placeID}/`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const getRestaurants = createAsyncThunk(
	"getRestaurants",
	async (data, { rejectWithValue }) => {
		const user_location = {
			lat: data.lat,
			long: data.long,
			search: data.search,
		};
		try {
			const response = await axios.post(`/api/restaurants/`, user_location);
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
			state.restaurants = action.payload.restaurants;
			state.restaurantsLoading = false;
			action.payload.restaurants.map((restaurant) => {
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
	},
});

export const { setAddress, setCuisine } = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
