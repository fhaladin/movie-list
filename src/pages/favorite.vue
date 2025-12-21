<template>
  <v-container class="py-0">
    <v-row>
      <v-col
        v-for="i in 4"
        :key="i"
        cols="12"
        :lg="viewMode === 'grid' ? 4 : 12"
        :md="viewMode === 'grid' ? 6 : 12"
      >
        <ui-card-grid v-if="viewMode === 'grid'" />
        <ui-card-list v-else />
      </v-col>
    </v-row>

    <v-pagination class="my-6" :length="1" total-visible="10" />
  </v-container>
</template>

<script lang="ts" setup>
  import { useMovieStore } from '@/stores/movie'

  const movieStore = useMovieStore()
  const viewMode = computed(() => movieStore.viewMode)
</script>
