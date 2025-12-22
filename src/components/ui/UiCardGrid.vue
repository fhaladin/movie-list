<template>
  <v-card :elevation="elevation" @mouseleave="elevation = 1" @mouseover="elevation = 3">
    <div class="tag">
      <v-chip v-if="isTrending" color="orange" size="x-small" variant="flat">
        <p class="text-caption text-white">Trending</p>
      </v-chip>
      <v-chip v-if="isEditorChoice" color="blue" size="x-small" variant="flat">
        <p class="text-caption text-white">Editor's Choice</p>
      </v-chip>
    </div>
    <v-btn
      class="fav-button"
      :color="isFavorited ? 'pink' : undefined"
      :icon="isFavorited ? 'mdi-heart' : 'mdi-heart-outline'"
      size="small"
      @click="toggleFavorite"
    />

    <v-img
      cover
      height="200px"
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    />

    <v-card-title>
      {{ movie.Title }}
    </v-card-title>

    <div class="d-flex align-center justify-space-between mb-4">
      <v-card-subtitle>
        {{ movie.Year }} - {{ category }}
      </v-card-subtitle>

      <v-spacer />

      <v-card-subtitle class="d-flex align-center">
        <v-icon class="mr-1" color="orange" size="x-small">mdi-star</v-icon>
        <p class="text-caption">{{ rating }}/10</p>
      </v-card-subtitle>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
  import type { Movie } from '@/stores/movie'
  import { computed, ref } from 'vue'
  import { useFavoriteStore } from '@/stores/favorite'
  import { randomBoolean, randomCategory, randomNumber } from '@/utils/randomizer'

  const props = defineProps<{
    movie: Movie
  }>()

  const favoriteStore = useFavoriteStore()
  const elevation = ref<number>(1)
  const isTrending = ref<boolean>(randomBoolean())
  const isEditorChoice = ref<boolean>(randomBoolean())
  const rating = ref<number>(randomNumber(4, 10))
  const category = ref<string>(randomCategory())

  const isFavorited = computed(() => favoriteStore.isFavorite(props.movie))

  function toggleFavorite () {
    favoriteStore.toggleFavorite(props.movie)
  }
</script>

<style lang="scss" scoped>
.v-card {
  position: relative;

  &:hover {
    transform: translateY(-4px);
    transition: transform 0.5s;

    :deep() {
      .v-img {
        img {
          transform: scale(1.1);
          transition: transform 0.5s;
        }
      }
    }
  }
}

:deep(.v-card) {
  &:hover {
    .v-img {
      transform: scale(1.2);
      transition: transform 0.3s ease-in-out;
    }
  }
}

.tag {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  gap: 4px;
}

.fav-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}
</style>
