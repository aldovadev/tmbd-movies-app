export interface Card {
  id: number
  title: string
  vote_average: number
  poster_path: string
}

export interface MovieApiResponse {
  results: any[];
}
