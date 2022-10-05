import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { genres  } from "../../api/getMovies";
import { AppThunk } from "../store";
import { genre, typeGenres } from "../types";


const initialState:typeGenres={
    items : {
        genresMovies:null,
        genresTv:null
    },
    loading:false,
    error:null
}


const genreSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        setGenresMovies:(state,action)=>{
            state.items.genresMovies= action.payload
        }, setGenresTv:(state,action)=>{
          state.items.genresTv= action.payload
      }
      }
  
  });
  
  export const allGenres = (clase:string): AppThunk => {
    return async (dispatch) => {
      try {
        if(clase ==='all'){
          const responseMovie= await genres('movie');
          const responseTv= await genres('tv');
          dispatch(setGenresMovies(responseMovie.data.genres));
          dispatch(setGenresTv(responseTv.data.genres));
        }else if(clase ==='movie'){
          const responseMovie= await genres(clase);
          dispatch(setGenresMovies(responseMovie.data.genres));
        }else{
          const responseTv= await genres('tv');dispatch(setGenresTv(responseTv.data.genres));
        }
      } catch (error) {
       console.error(error)
      }
    };
  }
  
  export const {
    setGenresMovies, setGenresTv
  } = genreSlice.actions;
  
  export default genreSlice.reducer;


  //para filtrar por genres puedo preguntar cuando traigo las peliculas, si el estado tiene una genre, filtrar el array por esa genre==>
  //ej: state=[ciencie ficcion] yo a lo que me llega de la api lo filtro con esa condicion ==> if(state === a el parametro de genre) state.filter(el=> el.genre==param)