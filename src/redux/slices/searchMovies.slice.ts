import { createSlice } from "@reduxjs/toolkit";
import { urlSearchMovies } from "../../api/getMovies";
import { AppThunk } from "../store";
import { moviesState } from "../types";

const initialState:moviesState={
items:[], 
loading:false,
error: null
}

const MovieSearchSlice= createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearch:(state,action)=>{
            state.items= action.payload
        }
    }
})

export const searchMovies= (movie: string): AppThunk=>{
    return async (dispatch)=>{
        const response= await urlSearchMovies(movie)
        try{
        movie.length > 2?
        dispatch(setSearch(response.data.results)): dispatch(setSearch(response.status))
        }catch (error){
        console.log(error)
        }
    }
    }
    
    export const{
        setSearch
    } = MovieSearchSlice.actions
    
    export default MovieSearchSlice.reducer