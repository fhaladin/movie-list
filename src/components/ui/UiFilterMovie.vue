<template>
  <ui-filter
    :search-query="movieStore.searchQuery"
    :selected-sort="movieStore.selectedSort"
    :view-mode="movieStore.viewMode"
    @update:search-query="handleSearchChange"
    @update:selected-sort="handleSortChange"
    @update:view-mode="handleViewModeChange"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useMovieStore } from '@/stores/movie'

  const movieStore = useMovieStore()
  const searchDebounced = ref<number | null>(null)

  function handleSearchChange (value: string): void {
    movieStore.searchQuery = value

    clearTimeout(searchDebounced.value as number)

    searchDebounced.value = setTimeout(async () => {
      if (movieStore.page === 1) {
        await movieStore.fetch()
      } else {
        movieStore.page = 1
      }
    }, 400)
  }

  function handleSortChange (value: string): void {
    movieStore.selectedSort = value
  }

  function handleViewModeChange (value: 'grid' | 'list'): void {
    movieStore.viewMode = value
  }
</script>
