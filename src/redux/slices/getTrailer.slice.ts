import { createSlice } from "@reduxjs/toolkit";
import { urlTrailer } from "../../api/getMovies";
import { AppThunk } from "../store";
import { typeTrailer } from "../types";

const initialState: typeTrailer = {
	items: [],
	loading: false,
	error: null,
};

const trailer = createSlice({
	name: "trailer",
	initialState,
	reducers: {
		setTrailer: (state, action) => {
			state.items = action.payload;
		},
	},
});

export const getTrailer = (
	id: string | undefined,
	lenguage: string | null
): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlTrailer(id, lenguage);
			const shortResponse = response.data.results.slice(0, 2);
			dispatch(trailer.actions.setTrailer(shortResponse));
		} catch (error) {
			console.log(error);
		}
	};
};

export const { setTrailer } = trailer.actions;

export default trailer.reducer;
