export interface movies {
  poster_path: string | null;
  id: number | string | undefined;
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
  adult: boolean;
  overview: string;
  release_date: string;
  genres: genre[];
  id: number | string | undefined;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  belongs_to_collection: null | object;
  budget: number;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: object[];
  production_countries: object[];
  spoken_languages: object[];
  staus: string;
  tagline: string | null;
  runtime: number;
}

export interface typeDetail {
  items: detail;
  loading: boolean;
  error: Error | null;
}

export interface result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published: string;
  id: string;
}

export interface trailer {
  id: number;
  results: result[];
}

export interface typeTrailer {
  items: trailer;
  loading: boolean;
  error: Error | null;
}

export interface resultAllMovies {
  description: string;
  id: number;
  name: string;
  poster_path: string | null;
}

export interface allMovies {
  pages: number;
  result: resultAllMovies[];
}

export interface typeAllMovies {
  items: allMovies;
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
  id:number
  name:string
  poster_path: string | null
  title:null
}

export interface typePopular{
  items: seriesPopular[]
  loading:boolean
  error: Error | null
}