import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import moviesReducer from "./slices/get.slice";
import genreReducer from "./slices/genres.slice"
import detailReducer from './slices/detailMovie.slice'
import trailerReducer from './slices/getTrailer.slice'
import topMoviesReducer from './slices/topMovies.slice'
import estrenosReducer from './slices/estrenos.slice'
import SearchMoviesReducer from './slices/searchMovies.slice'
import TrailerTvReducer from './slices/getTrailerTv.slice'
import detailTvReducer from './slices/detailTvs.slice'
import allMoviesReducer from './slices/allMovies.slice'
import allSeriesReducer from './slices/allSeries.slice'


const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genreReducer,
    detail: detailReducer,
    trailer: trailerReducer,
    topMovies: topMoviesReducer,
    estrenos: estrenosReducer,
    searchMovies:SearchMoviesReducer,
    trailerTv: TrailerTvReducer,
    detailTv: detailTvReducer,
    allMovies: allMoviesReducer,
    allSeries: allSeriesReducer,

  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
