export interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average:number;
  overview: string;

}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages:number;
  total_results: number;

}