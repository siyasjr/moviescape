"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/types";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (movie: Movie) => {
    const exists = favorites.find((m) => m.id === movie.id);
    let updated: Movie[];

    if (exists) {
      updated = favorites.filter((m) => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
