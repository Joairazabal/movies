export interface movies {
  poster_path: string | null;
  id: number | undefined;
  title: string;
  name:null

}

export interface moviesState {
  items: movies[];
  loading: boolean;
  error: Error | null;
}



export interface genre {
  id: number;
  name: string;
}

export interface typeGenres {
  items: Array<genre>;
  loading: boolean;
  error: Error | null;
}

export interface detail {
  poster_path: string | null;
  overview: string | null;
  release_date: string | null;
  genres: genre[] | null;
  id: number | string | undefined | null;
  title: string | null;
  runtime: number | null;
  number_of_seasons:number | null
  first_air_date: string | null
}

export interface typeDetail {
  items: detail 
  loading: boolean;
  error: Error | null;
}

export interface result {
  key: string;
  id: string;
}


export interface typeTrailer {
  items: result[];
  loading: boolean;
  error: Error | null;
}


export interface typetopMovies{
items:  resultTop
loading: boolean
error: Error | null
}
export interface resultTop{
  results:topMovies[]
}

export interface topMovies{
  poster_path: string | null
  id: number
  title: string
  name: null
}

export interface seriesPopular{
  id:number | null | undefined 
  name:string
  poster_path: string | null
  title:null
}

export interface typePopular{
  items: seriesPopular[]
  loading:boolean
  error: Error | null
}
