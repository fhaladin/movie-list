import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import api from '@/services/api'
import { type Movie, useMovieStore } from '@/stores/movie'

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Movie Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Initial State', () => {
    it('should have initial state', () => {
      const store = useMovieStore()

      expect(store.viewMode).toBe('grid')
      expect(store.data).toEqual([]) as Movie[]
      expect(store.page).toBe(1)
      expect(store.perPage).toBe(10)
      expect(store.total).toBe(0) as number
      expect(store.totalPages).toBe(1) as number
      expect(store.loading).toBe(false) as boolean
      expect(store.pending).toBe(true) as boolean
      expect(store.error).toBeNull() as string | null
      expect(store.searchQuery).toBe('') as string
      expect(store.selectedSort).toBe('latest') as string
      expect(store.fetchDebounced).toBeNull() as number | null
    })
  })

  describe('Getters', () => {
    it('should return sorted data by title in ascending order', () => {
      const store = useMovieStore()
      store.data = [
        { Title: 'Spiderman', Year: 2020 },
        { Title: 'Aquaman', Year: 2021 },
      ]

      store.selectedSort = 'az'
      const sortedData = store.sortedData

      expect(sortedData).toEqual([
        { Title: 'Aquaman', Year: 2021 },
        { Title: 'Spiderman', Year: 2020 },
      ])
    })

    it('should return sorted data by title in descending order', () => {
      const store = useMovieStore()
      store.data = [
        { Title: 'Spiderman', Year: 2020 },
        { Title: 'Aquaman', Year: 2021 },
      ]

      store.selectedSort = 'za'
      const sortedData = store.sortedData

      expect(sortedData).toEqual([
        { Title: 'Spiderman', Year: 2020 },
        { Title: 'Aquaman', Year: 2021 },
      ])
    })

    it('should return sorted data by year in latest order', () => {
      const store = useMovieStore()
      store.data = [
        { Title: 'Spiderman', Year: 2020 },
        { Title: 'Aquaman', Year: 2021 },
      ]

      store.selectedSort = 'latest'
      const sortedData = store.sortedData

      expect(sortedData).toEqual([
        { Title: 'Aquaman', Year: 2021 },
        { Title: 'Spiderman', Year: 2020 },
      ])
    })

    it('should return sorted data by year in oldest order', () => {
      const store = useMovieStore()
      store.data = [
        { Title: 'Spiderman', Year: 2020 },
        { Title: 'Aquaman', Year: 2021 },
      ]

      store.selectedSort = 'oldest'
      const sortedData = store.sortedData

      expect(sortedData).toEqual([
        { Title: 'Spiderman', Year: 2020 },
        { Title: 'Aquaman', Year: 2021 },
      ])
    })
  })

  describe('Fetch Data', () => {
    const mockMovies: Movie[] = [
      { Title: 'Spiderman', Year: 2020, imdbID: 'tt1' },
      { Title: 'Aquaman', Year: 2021, imdbID: 'tt2' },
      { Title: 'Batman', Year: 2022, imdbID: 'tt3' },
      { Title: 'Superman', Year: 2023, imdbID: 'tt4' },
    ]

    const mockResponse = {
      data: {
        data: mockMovies,
        page: 1,
        per_page: 10,
        total: 4,
        total_pages: 1,
      },
    }

    it('should fetch data', async () => {
      const store = useMovieStore()

      ;(api.get as any).mockResolvedValue(mockResponse)
      store.fetch()
      await vi.advanceTimersByTimeAsync(400)

      expect(api.get).toHaveBeenCalledWith('/movies?page=1')
      expect(store.data).toEqual(mockMovies)
      expect(store.page).toBe(1) as number
      expect(store.perPage).toBe(10) as number
      expect(store.total).toBe(4) as number
      expect(store.totalPages).toBe(1) as number
      expect(store.loading).toBe(false) as boolean
      expect(store.pending).toBe(false) as boolean
      expect(store.error).toBeNull() as string | null
    })

    it('should fetch data with search query', async () => {
      const store = useMovieStore()

      ;(api.get as any).mockResolvedValue(mockResponse)
      store.searchQuery = 'Spiderman'
      store.fetch()

      await vi.advanceTimersByTimeAsync(400)

      expect(api.get).toHaveBeenCalledWith('/movies?Title=Spiderman&page=1')
      expect(store.data).toEqual(mockMovies)
    })
  })
})
