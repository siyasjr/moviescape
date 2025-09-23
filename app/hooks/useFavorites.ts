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

  

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  return { favorites, isFavorite };
}
