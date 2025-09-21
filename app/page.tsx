'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPopularMovies, posterUrl } from '@/lib/api'
import { Movie } from '@/types/types'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const results = await getPopularMovies()
        setMovies(results)
      } catch (err) {
        console.error('Failed to fetch movies', err)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) return <div>Loading...</div>
  if (!movies.length) return <div>No movies found.</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded-lg shadow-md">
            {posterUrl(movie.poster_path) ? (
              <Image
                src={posterUrl(movie.poster_path)!}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded-md object-cover"
              />
            ) : (
              <div className="w-full h-[750px] bg-gray-300 rounded-md flex items-center justify-center">
                No Image
              </div>
            )}
            <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-500">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
