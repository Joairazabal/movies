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


  //para filtrar por genres puedo preguntar cuando traigo las peliculas, si el estado tiene una genre, filtrar el array por esa genre==>
  //ej: state=[ciencie ficcion] yo a lo que me llega de la api lo filtro con esa condicion ==> if(state === a el parametro de genre) state.filter(el=> el.genre==param)