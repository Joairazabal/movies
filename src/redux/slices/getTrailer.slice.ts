import { createSlice } from "@reduxjs/toolkit";
import { urlTrailer } from "../../api/getMovies";
import { AppThunk } from "../store";
import { typeTrailer } from "../types";

const initialState:typeTrailer={
items:{
    id: 0,
    results :[]
}, 
loading:false,
error: null
}

const trailer= createSlice({
    name: 'trailer',
    initialState,
    reducers:{
        setTrailer:(state,action)=>{
            state.items= action.payload
        }
    }
})

export const getTrailer= (id: string | undefined): AppThunk=>{
    return async (dispatch)=>{
        try{
        const response= await urlTrailer(id);
        dispatch(trailer.actions.setTrailer(response.data))
        }catch (error){
        console.log(error)
        }
    }
    }
    
    export const{
        setTrailer
    } = trailer.actions
    
    export default trailer.reducer