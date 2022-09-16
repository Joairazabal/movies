import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMovies } from "../../api/getMovies";
import { AppThunk } from "../store";
import { moviesState, movies } from "../types";

const initialState: moviesState = {
  items: [
    {
      poster_path: "",
      id: 0,
      title: "",
      name:null
    },
  ],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const populartyMovies = (): AppThunk => {
  return async dispatch => {
    try {
      const response = await getMovies();
      const shortResponse = response.data.results.splice(1, 10);
      dispatch(setMovies(shortResponse));
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setMovies } = movieSlice.actions;

export default movieSlice.reducer;
