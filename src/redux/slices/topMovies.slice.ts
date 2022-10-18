import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { urlTop } from "../../api/getMovies";
import { AppThunk } from "../store";
import { typetopMovies } from "../types";

const initialState: typetopMovies = {
	items: {
		results: [],
	},
	loading: false,
	error: null,
};

const topMovieSlice = createSlice({
	name: "topMovies",
	initialState,
	reducers: {
		setTop: (state, action) => {
			state.items = action.payload;
		},
	},
});

export const topMovies = (lenguage: string | null): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlTop(lenguage);
			const shortReponse = response.data.results.splice(0, 10);
			dispatch(topMovieSlice.actions.setTop(response.data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const { setTop } = topMovieSlice.actions;

export default topMovieSlice.reducer;
