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
    error: null,
    searchQuery: '',
    selectedSort: 'latest',
    fetchDebounced: null,
  }),
  actions: {
    async fetch () {
      this.loading = true
      clearTimeout(this.fetchDebounced as number)

      this.fetchDebounced = setTimeout(async () => {
        try {
          const { data } = await api.get(`/movies?title=${this.searchQuery}&page=${this.page}`)

          this.data = data.data
          this.page = data.page
          this.perPage = data.per_page
          this.total = data.total
          this.totalPages = data.total_pages
        } catch (error) {
          this.error = error as string
        }
      }, 400)
    },
  },
})
