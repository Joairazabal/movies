import axios from "axios";


export const getMovies = () => axios('https://api.themoviedb.org/3/movie/popular?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=en-US&page=1');
export const nextMovies = ()=>axios('https://api.themoviedb.org/3/movie/popular?api_key=61801c4cf07fbdd51b37c4290fd4b299&language=en-US&page=2')
