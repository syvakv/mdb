export interface ResponseMovies {
  results: Movie[];
}
export interface ResponseRecomendation {
  results: Recomendation[];
}
export interface ResponseVideo {
  results: Video[];
}

export interface MovieDetail {
  result: Genre | undefined;
  backdrop_path: string | null;
  budget: number;
  genres: Genre[];
  overview: string | null;
  popularity: number;
  release_date: string;
  poster_path: string | null;
  title: string;
  vote_average: string;
  vote_count: string;
  tagline: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  result: Genre | undefined;
  backdrop_path: string | null;
  budget: number;
  genres: Genre[];
  id: number;
  original_title: string;
  poster_path: string;
  vote_average: string;
}

export interface Recomendation {
  id: number;
  original_title: string;
  poster_path: string;
  vote_average: string;
  genre_ids: Genre[];
}

export interface Video {
  key: string;
}
