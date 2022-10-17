import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { urlActors, urlDetail, urlProviders } from "../../api/getMovies";
import { AppThunk } from "../store";
import { objectCast, typeDetail } from "../types";

const initialState: typeDetail = {
	items: {
		poster_path: null,
		overview: null,
		release_date: null,
		genres: null,
		id: null,
		title: null,
		runtime: null,
		number_of_seasons: null,
		first_air_date: null,
		backdrop_path: null,
		actors: null,
		name: null,
		providers: null,
	},
	loading: true,
	error: null,
};

const detail = createSlice({
	name: "detail",
	initialState,
	reducers: {
		setDetail: (state, action) => {
			state.items = action.payload;
			state.loading = false;
		},
		setClear: () => initialState,
		setActors: (state, action) => {
			state.items.actors = action.payload;
		},
		setProvidersMovie: (state, action) => {
			state.items.providers = action.payload;
		},
	},
});

export const getDetail = (numero: string | undefined): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlDetail(numero);
			dispatch(detail.actions.setDetail(response.data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const getActors = (id: string | undefined): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlActors(id, "movie");
			const filterActors = response.data.cast.filter(
				(el: objectCast) => el.known_for_department === "Acting"
			);
			const actors: string[] = filterActors.map((el: objectCast) => el.name);
			const shortActors: string[] = actors.splice(1, 8);
			dispatch(setActors(shortActors));
		} catch (error) {
			console.error(error);
		}
	};
};

export const getProviderMovie = (
	id: string | undefined,
	clase: string
): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlProviders(id, clase);

			const providers = response.data.results.AR.flatrate;
			dispatch(setProvidersMovie(providers));
		} catch (error) {
			console.error(error);
		}
	};
};

export const { setDetail, setClear, setActors, setProvidersMovie } =
	detail.actions;

export default detail.reducer;
