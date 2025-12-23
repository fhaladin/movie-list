import type { Movie } from './movie'
import { defineStore } from 'pinia'

interface State {
  favorites: Movie[]
  searchQuery: string
  selectedSort: string
}

const STORAGE_KEY = 'movie-favorites'

function loadFavorites (): Movie[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.warn('Failed to load favorites from localStorage:', error)
    return []
  }
}

function saveFavorites (favorites: Movie[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.warn('Failed to save favorites to localStorage:', error)
  }
}

export const useFavoriteStore = defineStore('favorite', {
  state: (): State => ({
    favorites: loadFavorites(),
    searchQuery: '',
    selectedSort: 'latest',
  }),
  getters: {
    isFavorite: (state: State) => {
      return (movie: Movie): boolean => {
        return state.favorites.some(fav => fav.imdbID === movie.imdbID)
      }
    },
    favoriteCount: (state: State): number => {
      return state.favorites.length
    },
    filteredAndSortedData: (state: State): Movie[] => {
      let filtered = state.favorites

      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase().trim()
        filtered = filtered.filter(movie =>
          movie.Title.toLowerCase().includes(query)
          || movie.Year.toString().includes(query),
        )
      }

      return filtered.toSorted((a: Movie, b: Movie) => {
        switch (state.selectedSort) {
          case 'az': {
            return a.Title.localeCompare(b.Title)
          }
          case 'za': {
            return b.Title.localeCompare(a.Title)
          }
          case 'latest': {
            return b.Year - a.Year
          }
          case 'oldest': {
            return a.Year - b.Year
          }
        }

        return b.Year - a.Year
      })
    },
  },
  actions: {
    toggleFavorite (movie: Movie): void {
      const index = this.favorites.findIndex(fav => fav.imdbID === movie.imdbID)

      if (index === -1) {
        this.favorites.push(movie)
      } else {
        this.favorites.splice(index, 1)
      }

      saveFavorites(this.favorites)
    },
    addFavorite (movie: Movie): void {
      if (this.isFavorite(movie)) {
        return
      }
      this.favorites.push(movie)
      saveFavorites(this.favorites)
    },
    removeFavorite (movie: Movie): void {
      const index = this.favorites.findIndex(fav => fav.imdbID === movie.imdbID)
      if (index !== -1) {
        this.favorites.splice(index, 1)
        saveFavorites(this.favorites)
      }
    },
    clearFavorites (): void {
      this.favorites = []
      saveFavorites(this.favorites)
    },
  },
})
