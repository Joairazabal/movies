import { createSlice } from "@reduxjs/toolkit";
import { urlActors, urlDetail } from "../../api/getMovies";
import { AppThunk } from "../store";
import {  objectCast, typeDetail } from "../types";

const initialState:typeDetail={
    items:{
    poster_path: null,
    overview: null,
    release_date: null,
    genres: null,
    id: null,
    title: null,
    runtime: null,
    number_of_seasons: null,
    first_air_date: null,
    backdrop_path:null,
    actors:null
    }
    ,
    loading: true,
    error: null,
};


const detail= createSlice({
    name: 'detail',
    initialState,
    reducers:{
        setDetail:(state,action)=>{
            state.items= action.payload
            state.loading=false
        },
        setClear: ()=> initialState,
        setActors:(state,action)=>{
        state.items.actors=action.payload 
        }
        

    }
})

export const getDetail= (numero: string | undefined): AppThunk =>{
return async (dispatch)=>{
    try{
    const response= await urlDetail(numero);
    dispatch(detail.actions.setDetail(response.data))
    }catch (error){
    console.log(error)
    }
}
}

export const getActors= (id:string | undefined): AppThunk=>{
    return async(dispatch)=>{
        try{
    const response= await urlActors(id, 'movie')
    const filterActors= response.data.cast.filter((el:objectCast)=> el.known_for_department === 'Acting')
    const actors:string[]= filterActors.map((el:objectCast)=>el.name )
    const shortActors:string[]= actors.splice(1,8)
    dispatch(setActors(shortActors))
    }catch(error){
        console.error(error)
    }
    }
}

export const{
    setDetail, setClear, setActors
} = detail.actions

export default detail.reducer