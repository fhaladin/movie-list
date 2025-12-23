import { defineStore } from 'pinia'
import api from '@/services/api'

interface State {
  viewMode: 'grid' | 'list'
  data: Movie[]
  page: number
  perPage: number
  total: number
  totalPages: number
  loading: boolean
  pending: boolean
  error: string | null
  searchQuery: string
  selectedSort: string
  fetchDebounced: number | null
}

export interface Movie {
  Title: string
  Year: number
  imdbID: string
}

export const useMovieStore = defineStore('movie', {
  state: (): State => ({
    viewMode: 'grid',
    data: [],
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1,
    loading: false,
    pending: true,
    error: null,
    searchQuery: '',
    selectedSort: 'latest',
    fetchDebounced: null,
  }),
  getters: {
    sortedData: (state: State): Movie[] => {
      return state.data.toSorted((a: Movie, b: Movie) => {
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

        return a.Year - b.Year
      })
    },
  },
  actions: {
    async fetch () {
      this.loading = true

      const query = new URLSearchParams()
      if (this.searchQuery) {
        query.append('Title', this.searchQuery)
      }
      if (this.page) {
        query.append('page', this.page.toString())
      }

      clearTimeout(this.fetchDebounced as number)

      this.fetchDebounced = setTimeout(async () => {
        try {
          const { data } = await api.get(`/movies?${query.toString()}`)

          this.data = data.data
          this.page = data.page
          this.perPage = data.per_page
          this.total = data.total
          this.totalPages = data.total_pages || 1
        } catch (error) {
          this.error = error as string
        } finally {
          this.pending = false
          this.loading = false
        }
      }, 400)
    },
  },
})
