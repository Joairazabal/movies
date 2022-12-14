import { createSlice } from "@reduxjs/toolkit";
import { urlDetail, urlDetailTvs, urlProviders } from "../../api/getMovies";
import { AppThunk } from "../store";
import { typeDetail, objectCast } from "../types";
import { urlActors } from "../../api/getMovies";
import { async } from "@firebase/util";

const initialState: typeDetail = {
	items: {
		poster_path: null,
		overview: null,
		release_date: null,
		genres: [],
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
	loading: false,
	error: null,
};

const detailTv = createSlice({
	name: "detailTv",
	initialState,
	reducers: {
		setDetailTv: (state, action) => {
			state.items = action.payload;
		},
		setClearTv: () => initialState,
		setActorsTv: (state, action) => {
			state.items.actors = action.payload;
		},
		setLoadingTv: (state, action) => {
			state.loading = action.payload;
		},
		setProvidersTv: (state, action) => {
			state.items.providers = action.payload;
		},
	},
});

export const getDetailTv = (
	numero: string | undefined,
	lenguage: string | null
): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlDetailTvs(numero, lenguage);
			dispatch(detailTv.actions.setDetailTv(response.data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const getActorsTv = (id: string | undefined): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlActors(id, "movie");
			const filterActors = response.data.cast.filter(
				(el: objectCast) => el.known_for_department === "Acting"
			);
			const actors: string[] = filterActors.map((el: objectCast) => el.name);
			const shortActors: string[] = actors.splice(1, 8);
			dispatch(setActorsTv(shortActors));
		} catch (error) {
			console.error(error);
		}
	};
};

export const getProvider = (
	id: string | undefined,
	clase: string
): AppThunk => {
	return async (dispatch) => {
		try {
			const response = await urlProviders(id, clase);
			const providers = response.data.results.AR.flatrate;
			dispatch(setProvidersTv(providers));
		} catch (error) {
			console.error(error);
		}
	};
};
export const setLoading = (set: boolean): AppThunk => {
	return (dispatch) => {
		dispatch(setLoadingTv(set));
	};
};

export const {
	setDetailTv,
	setClearTv,
	setActorsTv,
	setLoadingTv,
	setProvidersTv,
} = detailTv.actions;

export default detailTv.reducer;
