import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMovies,  } from "../api/getMovies";
import { AppThunk } from "./store";
import { moviesState, movies } from "./todo.types";

const initialState:moviesState = {
  items : [{
    poster_path: "",
    adult: false,
    overview: "",
    release_date: "",
    genre_ids: [""],
    id: 0,
    original_title: "",
    original_language: "",
    title: "",
    backdrop_path: "" ,
    popularity: 0,
    vote_count:0,
    video: false,
    vote_average:0,
  }],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies:(state,action)=>{
      state.items= action.payload
    }

}});

export const allMovies = (): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await getMovies();
      dispatch(setMovies(response.data.results))
    
    } catch (error) {
     console.log(error)
    }
  };
}

export const {
  setMovies

} = movieSlice.actions;

export default movieSlice.reducer;
