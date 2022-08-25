import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import moviesReducer from "./slices/get.slice";
import genreReducer from "./slices/genres.slice"

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genres: genreReducer,
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
