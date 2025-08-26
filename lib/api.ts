import "server-only";
import { Movie, PaginatedResponse } from "@/types/types";

const token = process.env.TMDB_ACCESS_TOKEN;
if(!token) {
  throw new Error('No Access Token set');
}

const BASE_URL = "http://api.themoviedb.org/3";

async function tmbdFetch<T>(path: string, search = ""): Promise<T>{

  const url = `${BASE_URL}${path}${search ? `?${search}` : ""}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN!}`,
      Accept: "application/json",
    },

    next: { revalidate: 3600},

  })

  if (!res.ok){
    throw new Error(`TMDB error ${res.status} : ${await res.text()}`);
  }

  return res.json();

}

export async function getPopularMovies(page = 1){

    const qs = new URLSearchParams({
      language: "en-US",
      page: String(page), 

    }).toString();

    return tmbdFetch<PaginatedResponse<Movie>>("/movie/popular", qs);

}

export function posterUrl(
  path: string | null ,
  size: "w342" | "w500" | "original" = "w500",

 ){
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
 }
 
