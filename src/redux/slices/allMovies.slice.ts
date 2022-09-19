import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  urlAllMovies } from "../../api/getMovies";
import { AppThunk } from "../store";
import { moviesState, } from "../types";

const initialState: moviesState = {
  items: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "allMovies",
  initialState,
  reducers: {
    setAllMovies:(state,action)=>{
      state.items = [...state.items, ...action.payload];
    },
  },
});


export const allMovies = (page:number): AppThunk=>{
return async dispatch=>{
  try {
    const response= await urlAllMovies(page)
    dispatch(setAllMovies(response.data.results))
  } catch (error) {
    console.error(error)
  }
}


}

export const {setAllMovies} = movieSlice.actions;

export default movieSlice.reducer;
