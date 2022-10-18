import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { urlAllSeries } from "../../api/getMovies";
import { AppThunk } from "../store";
import { typePopular } from "../types";

const initialState: typePopular = {
	items: [],
	loading: false,
	error: null,
};

const serieSlice = createSlice({
	name: "allSeries",
	initialState,
	reducers: {
		setAllSeries: (state, action) => {
			state.items = [...state.items, ...action.payload];
		},
		setFilterSeries: (state, action) => {
			state.items = action.payload;
		},
		setClear: (state) => {
			state.items = [];
		},
	},
});

export const getAllSeries = (
	page: number,
	lenguage: string | null
): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlAllSeries(page, null, lenguage);
			dispatch(setAllSeries(response.data.results));
		} catch (error) {
			console.error(error);
		}
	};
};

export const filterTvSeries = (
	genreId: string,
	page: number,
	lenguage: string | null
): AppThunk => {
	return async (dispatch) => {
		dispatch(setClear());
		const response = await urlAllSeries(page, genreId, lenguage);
		const filters = response.data.results;
		dispatch(setFilterSeries(filters));
	};
};

export const { setAllSeries, setFilterSeries, setClear } = serieSlice.actions;

export default serieSlice.reducer;
