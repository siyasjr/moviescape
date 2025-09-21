import { Movie, PaginatedResponse } from "@/types/types";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!apiKey) {
  throw new Error("No TMDB API Key set in .env.local");
}

const BASE_URL = "https://api.themoviedb.org/3";

// Generic fetch wrapper
async function tmdbFetch<T>(path: string, search = ""): Promise<T> {
  const url = `${BASE_URL}${path}${search ? `?${search}&api_key=${apiKey}` : `?api_key=${apiKey}`}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 }, // ISR for Next.js (safe for server)
  });

  if (!res.ok) {
    throw new Error(`TMDB error ${res.status} : ${await res.text()}`);
  }

  return res.json();
}

// Get only the `results` array so page.tsx can map directly
export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const qs = new URLSearchParams({
    language: "en-US",
    page: String(page),
  }).toString();

  const data = await tmdbFetch<PaginatedResponse<Movie>>("/movie/popular", qs);
  return data.results;
}

// Build poster URL safely
export function posterUrl(
  path: string | null,
  size: "w342" | "w500" | "original" = "w500"
): string | null {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}
