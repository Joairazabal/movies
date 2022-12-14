import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { urlAllMovies } from "../../api/getMovies";
import { AppThunk } from "../store";
import { moviesState, movies } from "../types";

const initialState: moviesState = {
	items: [],
	loading: false,
	error: null,
};

const movieSlice = createSlice({
	name: "allMovies",
	initialState,
	reducers: {
		setAllMovies: (state, action) => {
			state.items = [...state.items, ...action.payload];
		},
		setFilterMovies: (state, action) => {
			state.items = action.payload;
		},
		suggestionsMovie: (state, action) => {
			state.items = action.payload;
		},
		setClear: (state) => {
			state.items = [];
		},
	},
});

export const allMovies = (page: number, lenguage: string | null): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlAllMovies(page, null, lenguage);
			console.log(response.data.results)
			dispatch(setAllMovies(response.data.results));
		} catch (error) {
			console.error(error);
		}
	};
};

export const filterMovies = (
	genreId: string,
	page: number,
	lenguage: string | null
): AppThunk => {
	return async (dispatch) => {
		try {
			dispatch(setClear());
			const response = await urlAllMovies(page, genreId, lenguage);
			const filters: movies[] = response.data.results;
			dispatch(setFilterMovies(filters));
		} catch (error) {
			console.error(error);
		}
	};
};

export const suggestionsMovies = (
	page: number,
	lenguage: string | null
): AppThunk => {
	return async (dispatch) => {
		const pageRandom = Math.floor(Math.random() * page);
		const response = await urlAllMovies(pageRandom, null, lenguage);
		const suggestions: movies[] = response.data.results;
		dispatch(suggestionsMovie(suggestions));
	};
};

export const { setAllMovies, setFilterMovies, suggestionsMovie, setClear } =
	movieSlice.actions;

export default movieSlice.reducer;
