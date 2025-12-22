<template>
  <v-container class="py-0">
    <v-row>
      <v-col
        v-for="movie in movieStore.data"
        :key="movie.imdbID"
        cols="12"
        :lg="viewMode === 'grid' ? 4 : 12"
        :md="viewMode === 'grid' ? 6 : 12"
      >
        <ui-card-grid v-if="viewMode === 'grid'" :movie="movie" />
        <ui-card-list v-else :movie="movie" />
      </v-col>
    </v-row>

    <v-pagination v-model="movieStore.page" class="my-6" :length="movieStore.totalPages" total-visible="10" />
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
