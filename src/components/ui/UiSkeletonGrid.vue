<template>
  <v-row>
    <v-col
      v-for="i in 4"
      :key="i"
      :cols="viewMode === 'grid' ? 6 : 12"
      height="200px"
      :lg="viewMode === 'grid' ? 3 : 12"
      :md="viewMode === 'grid' ? 4 : 12"
    >
      <v-skeleton-loader
        class="mx-auto border"
        :type="viewMode === 'grid' ? 'image, article' : 'list-item-three-line'"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { useMovieStore } from '@/stores/movie'

  const movieStore = useMovieStore()
  const viewMode = computed((): 'grid' | 'list' => movieStore.viewMode)
</script>
