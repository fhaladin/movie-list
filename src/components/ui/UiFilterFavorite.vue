<template>
  <ui-filter
    :search-query="favoriteStore.searchQuery"
    :selected-sort="favoriteStore.selectedSort"
    :view-mode="movieStore.viewMode"
    @update:search-query="favoriteStore.setSearchQuery"
    @update:selected-sort="favoriteStore.setSelectedSort"
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
</script>
