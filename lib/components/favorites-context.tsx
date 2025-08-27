"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Movie } from "@/types/types";

export type FavMovie = Pick<Movie, "id" | "title" | "name" | "poster_path" | "vote_average" | "release_date" | "first_air_date" | "overview">;

type FavoritesState = {
  items: Record<number, FavMovie>;
  isFavorite: (id: number) => boolean;
  toggle: (movie: FavMovie) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const FavoritesCtx = createContext<FavoritesState | null>(null);
const LS_KEY = "favorites-v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<number, FavMovie>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<FavoritesState>(() => ({
    items,
    isFavorite: (id) => Boolean(items[id]),
    toggle: (movie) =>
      setItems((prev) => {
        const copy = { ...prev };
        if (copy[movie.id]) delete copy[movie.id];
        else copy[movie.id] = movie;
        return copy;
      }),
    remove: (id) => setItems((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    }),
    clear: () => setItems({}),
  }), [items]);

  return <FavoritesCtx.Provider value={value}>{children}</FavoritesCtx.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesCtx);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
