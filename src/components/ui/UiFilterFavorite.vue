<template>
  <ui-filter
    :search-query="favoriteStore.searchQuery"
    :selected-sort="favoriteStore.selectedSort"
    :view-mode="movieStore.viewMode"
    @update:search-query="handleSearchChange"
    @update:selected-sort="handleSortChange"
    @update:view-mode="handleViewModeChange"
  />
</template>

<script lang="ts" setup>
  import { useFavoriteStore } from '@/stores/favorite'
  import { useMovieStore } from '@/stores/movie'

  const favoriteStore = useFavoriteStore()
  const movieStore = useMovieStore()

  function handleViewModeChange (value: 'grid' | 'list'): void {
    movieStore.viewMode = value
  }

  function handleSearchChange (value: string): void {
    favoriteStore.setSearchQuery(value)
  }

  function handleSortChange (value: string): void {
    favoriteStore.setSelectedSort(value)
  }
</script>
