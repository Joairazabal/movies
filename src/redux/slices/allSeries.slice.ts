import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { urlAllSeries } from "../../api/getMovies";
import { AppThunk } from "../store";
import {typePopular } from "../types";

const initialState: typePopular = {
  items: [],
  loading: false,
  error: null,
};

const serieSlice = createSlice({
  name: "allSeries",
  initialState,
  reducers: {
    setAllSeries:(state,action)=>{
      state.items = [...state.items, ...action.payload];
    },
    setFilterSeries:(state,action)=>{
      state.items =[...state.items, ...action.payload]
    }
  },
});

export const getAllSeries = (page:number): AppThunk=>{
return async dispatch=>{
  try {
    const response= await urlAllSeries(page, null)
    dispatch(setAllSeries(response.data.results))
  } catch (error) {
    console.error(error)
  }
}}

export const filterTvSeries= (genreId:string, page:number): AppThunk=>{
  return async (dispatch)=>{
      const response= await urlAllSeries(page,genreId);
      const filters= response.data.results
      dispatch(setFilterSeries(filters))
  
  }
  }

export const {setAllSeries,setFilterSeries} = serieSlice.actions;

export default serieSlice.reducer;
