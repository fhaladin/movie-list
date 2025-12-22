<template>
  <v-container class="py-0">
    <ui-skeleton-grid v-if="movieStore.loading" />

    <v-row v-else>
      <v-col
        v-for="movie in movieStore.sortedData"
        :key="movie.imdbID"
        cols="12"
        :lg="viewMode === 'grid' ? 4 : 12"
        :md="viewMode === 'grid' ? 6 : 12"
      >
        <ui-card-grid v-if="viewMode === 'grid'" :movie="movie" />
        <ui-card-list v-else :movie="movie" />
      </v-col>

      <v-col v-if="!movieStore.pending" cols="12">
        <ui-not-found v-if="movieStore.data.length === 0" />
      </v-col>
    </v-row>

    <v-pagination
      v-if="!movieStore.pending"
      v-model="movieStore.page"
      class="my-6"
      :length="movieStore.totalPages"
      total-visible="10"
    />
  </v-container>
</template>

<script lang="ts" setup>
  import { useMovieStore } from '@/stores/movie'

  const movieStore = useMovieStore()
  const viewMode = computed((): 'grid' | 'list' => movieStore.viewMode)

  onMounted(async () => {
    await movieStore.fetch()
  })

  watch(() => movieStore.page, async () => {
    await movieStore.fetch()
  })
</script>
