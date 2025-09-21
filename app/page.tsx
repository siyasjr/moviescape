'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      )
      const data = await res.json()
      setMovies(data.results)
      setLoading(false)
    }

    fetchMovies()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded-lg shadow-md">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="rounded-md object-cover"
            />
            <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-500">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
