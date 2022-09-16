import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import moviesReducer from "./slices/get.slice";
import genreReducer from "./slices/genres.slice"
import detailReducer from './slices/detailMovie.slice'
import trailerReducer from './slices/getTrailer.slice'
import topMoviesReducer from './slices/topMovies.slice'
import estrenosReducer from './slices/estrenos.slice'
import SearchMoviesReducer from './slices/searchMovies.slice'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genreReducer,
    detail: detailReducer,
    trailer: trailerReducer,
    topMovies: topMoviesReducer,
    estrenos: estrenosReducer,
    searchMovies:SearchMoviesReducer,
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
