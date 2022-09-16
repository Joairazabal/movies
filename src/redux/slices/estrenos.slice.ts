import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { seriesPopular } from "../../api/getMovies";
import { AppThunk } from "../store";
import { typePopular } from "../types";


const initialState: typePopular = {
  items: [
      
  ],
  loading: false,
  error: null,
};

const sliceSeriesPopular = createSlice({
  name: "seriesPopular",
  initialState,
  reducers: {
    setpopular: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const getEstrenos= (): AppThunk=>{
return async (dispatch)=>{
try {
  const response = await seriesPopular()
  dispatch(setpopular(response.data.results))
} catch (error) {
  console.log(error)
}}}
;

export const { setpopular} = sliceSeriesPopular.actions;

export default sliceSeriesPopular.reducer;
