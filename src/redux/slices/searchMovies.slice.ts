import { createSlice } from "@reduxjs/toolkit";
import { urlSearchMovies } from "../../api/getMovies";
import { AppThunk } from "../store";
import { moviesState } from "../types";

const initialState: moviesState = {
	items: [],
	loading: false,
	error: null,
};

const MovieSearchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setSearch: (state, action) => {
			state.items = action.payload;
		},
		setClearSearch: (state) => {
			state.items = [];
		},
	},
});

export const searchMovies = (
	movie: string,
	lenguage: string | null
): AppThunk => {
	return async (dispatch) => {
		const response = await urlSearchMovies(movie, lenguage);
		try {
			movie.length > 2
				? dispatch(setSearch(response.data.results))
				: dispatch(setSearch(response.status));
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
};

export const { setSearch, setClearSearch } = MovieSearchSlice.actions;

export default MovieSearchSlice.reducer;
