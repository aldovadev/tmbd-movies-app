import { Genre } from "./genre.model"

interface LangList {
  english_name: string,
  iso_639_1: string,
  name: string
}

export interface Detail {
  title: string
  tagline: string
  vote_average: number
  spoken_languages: LangList[]
  runtime: number
  release_date: string
  genres: Genre[]
  overview: string
  homepage: string
  imdb_id: string
  poster_path: string
}

export interface VideoApiResponse {
  id: string,
  results: any
}



