export interface movies {
poster_path: string | null
adult: boolean
overview: string
release_date: string
genre_ids: string[]
id: number
original_title: string
original_language: string
title: string
backdrop_path: string | null
popularity: number
vote_count:number
video: boolean
vote_average:number
}

export interface moviesState {
  items: movies[];
  loading: boolean;
  error: Error | null;
}
 export interface genre{
  id: number;
  name: string;
 }
 export interface typeGenres{
  items: Array<genre>;
  loading: boolean;
  error: Error | null;
 }
 