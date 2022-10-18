import { createSlice } from "@reduxjs/toolkit";
import { urlTrailer, urlTrailerTvs } from "../../api/getMovies";
import { AppThunk } from "../store";
import { typeTrailer } from "../types";

const initialState: typeTrailer = {
	items: [],
	loading: false,
	error: null,
};

const trailerTv = createSlice({
	name: "trailerTv",
	initialState,
	reducers: {
		setTrailer: (state, action) => {
			state.items = action.payload;
		},
		setClearState: () => initialState,
	},
});

export const getTrailerTv = (
	id: string | undefined,
	lenguage: string | null
): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlTrailerTvs(id, lenguage);
			const shortResponse = response.data.results.slice(0, 2);
			dispatch(trailerTv.actions.setTrailer(shortResponse));
		} catch (error) {
			console.log(error);
		}
	};
};

export const { setTrailer, setClearState } = trailerTv.actions;

export default trailerTv.reducer;
