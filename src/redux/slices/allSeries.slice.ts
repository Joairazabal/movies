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
  },
});

export const getAllSeries = (page:number): AppThunk=>{
return async dispatch=>{
  try {
    const response= await urlAllSeries(page)
    dispatch(setAllSeries(response.data.results))
  } catch (error) {
    console.error(error)
  }
}}

export const {setAllSeries} = serieSlice.actions;

export default serieSlice.reducer;
