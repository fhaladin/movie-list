<template>
  <ui-filter-favorite />

  <v-container class="py-0">
    <v-row v-if="favoriteStore.filteredAndSortedData.length > 0">
      <v-col
        v-for="movie in favoriteStore.filteredAndSortedData"
        :key="movie.imdbID"
        cols="12"
        :lg="viewMode === 'grid' ? 4 : 12"
        :md="viewMode === 'grid' ? 6 : 12"
      >
        <ui-card-grid v-if="viewMode === 'grid'" :movie="movie" />
        <ui-card-list v-else :movie="movie" />
      </v-col>
    </v-row>

    <v-col v-else cols="12">
      <ui-not-found />
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useFavoriteStore } from '@/stores/favorite'
  import { useMovieStore } from '@/stores/movie'

  const favoriteStore = useFavoriteStore()
  const movieStore = useMovieStore()
  const viewMode = computed((): 'grid' | 'list' => movieStore.viewMode)
</script>
