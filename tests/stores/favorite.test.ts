import type { Movie } from '@/stores/movie'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useFavoriteStore } from '@/stores/favorite'

describe('Favorite Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  describe('Initial State', () => {
    it('should have initial state', () => {
      const store = useFavoriteStore()

      expect(store.favorites).toEqual([]) as Movie[]
      expect(store.searchQuery).toBe('') as string
      expect(store.selectedSort).toBe('latest') as string
    })

    it('should load favorites from localStorage', () => {
      const mockFavorites: Movie[] = [
        { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' },
        { Title: 'Aquaman', Year: 2021, imdbID: 'tt2' },
      ]

      localStorage.setItem('movie-favorites', JSON.stringify(mockFavorites))
      const store = useFavoriteStore()
      expect(store.favorites).toEqual(mockFavorites) as Movie[]
    })

    it('should handle invalid localStorage data', () => {
      localStorage.setItem('movie-favorites', 'invalid')
      const store = useFavoriteStore()
      expect(store.favorites).toEqual([]) as Movie[]
    })
  })

  describe('isFavorite Getter', () => {
    it('should return true if movie is in favorites', () => {
      const store = useFavoriteStore()
      const movie: Movie = { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' }

      store.addFavorite(movie)
      expect(store.isFavorite(movie)).toBe(true) as boolean
    })

    it('should return false if movie is not in favorites', () => {
      const store = useFavoriteStore()
      const movie: Movie = { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' }
      const anotherMovie: Movie = { Title: 'Aquaman', Year: 2021, imdbID: 'tt2' }

      store.addFavorite(movie)
      expect(store.isFavorite(anotherMovie)).toBe(false) as boolean
    })
  })

  describe('favoriteCount Getter', () => {
    it('should return the number of favorites', () => {
      const store = useFavoriteStore()
      const movies: Movie[] = [
        { Title: 'Movie 1', Year: 2020, imdbID: 'tt1' },
        { Title: 'Movie 2', Year: 2021, imdbID: 'tt2' },
        { Title: 'Movie 3', Year: 2022, imdbID: 'tt3' },
      ]

      store.favorites = movies
      expect(store.favoriteCount).toBe(3) as number
    })

    it('should return 0 if there are no favorites', () => {
      const store = useFavoriteStore()
      expect(store.favoriteCount).toBe(0) as number
    })
  })

  describe('filteredAndSortedData Getter', () => {
    const mockMovies: Movie[] = [
      { Title: 'Spiderman', Year: 2020 },
      { Title: 'Aquaman', Year: 2021 },
    ]

    it('should filter by search query', () => {
      const store = useFavoriteStore()

      store.favorites = mockMovies
      store.searchQuery = 'spiderman'

      expect(store.filteredAndSortedData).toEqual([mockMovies[0]]) as Movie[]
    })

    it('should return all movies if search query is empty', () => {
      const store = useFavoriteStore()

      store.favorites = mockMovies
      store.searchQuery = ''

      expect(store.filteredAndSortedData).toEqual([
        { Title: 'Aquaman', Year: 2021 },
        { Title: 'Spiderman', Year: 2020 },
      ]) as Movie[]
    })

    it('should return sorted data by title in ascending order', () => {
      const store = useFavoriteStore()

      store.favorites = mockMovies
      store.selectedSort = 'az'

      expect(store.filteredAndSortedData).toEqual([
        { Title: 'Aquaman', Year: 2021 },
        { Title: 'Spiderman', Year: 2020 },
      ]) as Movie[]
    })

    it('should return sorted data by title in descending order', () => {
      const store = useFavoriteStore()
      store.favorites = mockMovies
      store.selectedSort = 'za'
      expect(store.filteredAndSortedData).toEqual([
        { Title: 'Spiderman', Year: 2020 },
        { Title: 'Aquaman', Year: 2021 },
      ]) as Movie[]
    })

    it('should return sorted data by year in latest order', () => {
      const store = useFavoriteStore()

      store.favorites = mockMovies
      store.selectedSort = 'latest'

      expect(store.filteredAndSortedData).toEqual([
        { Title: 'Aquaman', Year: 2021 },
        { Title: 'Spiderman', Year: 2020 },
      ]) as Movie[]
    })

    it('should return sorted data by year in oldest order', () => {
      const store = useFavoriteStore()

      store.favorites = mockMovies
      store.selectedSort = 'oldest'

      expect(store.filteredAndSortedData).toEqual([
        { Title: 'Spiderman', Year: 2020 },
        { Title: 'Aquaman', Year: 2021 },
      ]) as Movie[]
    })
  })

  describe('toggleFavorite Action', () => {
    it('should add movie to favorites if it is not in favorites', () => {
      const store = useFavoriteStore()
      const movie: Movie = { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' }

      store.toggleFavorite(movie)
      expect(store.favorites).toEqual([movie]) as Movie[]
    })

    it('should remove movie from favorites if it is in favorites', () => {
      const store = useFavoriteStore()
      const movie: Movie = { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' }

      store.addFavorite(movie)
      store.toggleFavorite(movie)

      expect(store.favorites).toEqual([]) as Movie[]
    })
  })

  describe('addFavorite Action', () => {
    it('should add movie to favorites if it is not in favorites', () => {
      const store = useFavoriteStore()
      const movie: Movie = { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' }

      store.addFavorite(movie)

      expect(store.favorites).toHaveLength(1)
      expect(store.favorites[0]).toEqual(movie)
    })

    it('should not add movie to favorites if it is already in favorites', () => {
      const store = useFavoriteStore()
      const movie: Movie = { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' }

      store.addFavorite(movie)
      store.addFavorite(movie)

      expect(store.favorites).toHaveLength(1)
      expect(store.favorites[0]).toEqual(movie)
    })
  })

  describe('removeFavorite Action', () => {
    it('should remove movie from favorites if it is in favorites', () => {
      const store = useFavoriteStore()
      const movie: Movie = { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' }

      store.addFavorite(movie)
      store.removeFavorite(movie)

      expect(store.favorites).toEqual([]) as Movie[]
    })

    it('should not remove movie from favorites if it is not in favorites', () => {
      const store = useFavoriteStore()
      const movie: Movie = { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' }
      const anotherMovie: Movie = { Title: 'Aquaman', Year: 2021, imdbID: 'tt2' }

      store.addFavorite(movie)
      store.removeFavorite(anotherMovie)

      expect(store.favorites).toHaveLength(1)
      expect(store.favorites[0]).toEqual(movie)
    })
  })

  describe('clearFavorites Action', () => {
    it('should clear all favorites', () => {
      const store = useFavoriteStore()
      const movies: Movie[] = [
        { Title: 'Movie 1', Year: 2020, imdbID: 'tt1' },
        { Title: 'Movie 2', Year: 2021, imdbID: 'tt2' },
      ]

      store.favorites = movies
      store.clearFavorites()

      expect(store.favorites).toEqual([]) as Movie[]
    })
  })
})
