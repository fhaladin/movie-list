import { defineStore } from 'pinia'

interface State {
  viewMode: 'grid' | 'list'
}

export const useMovieStore = defineStore('movie', {
  state: (): State => ({
    viewMode: 'grid',
  }),
})
