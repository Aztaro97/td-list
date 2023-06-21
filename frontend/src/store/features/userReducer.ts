import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	error: null,
};

const userSlide = createSlice({
	name: "User",
	initialState,
	reducers: {},
	extraReducers: {
		// User List
	},
});

export default userSlide.reducer;