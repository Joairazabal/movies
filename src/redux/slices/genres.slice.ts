import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { genres  } from "../../api/getMovies";
import { AppThunk } from "../store";
import { genre, typeGenres } from "../types";


const initialState:typeGenres={
    items : [{
        id: 0,
        name:""
    }],
    loading:false,
    error:null
}


const genreSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        setGenres:(state,action)=>{
            state.items= action.payload
        }
      }
  
  });
  export const allGenres = (): AppThunk => {
    return async (dispatch) => {
      try {
        const response = await genres();
        dispatch(setGenres(response.data.genres))
      } catch (error) {
       console.log(error)
      }
    };
  }
  
  export const {
    setGenres
  } = genreSlice.actions;
  
  export default genreSlice.reducer;