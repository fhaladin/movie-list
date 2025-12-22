<template>
  <v-container>
    <v-card class="rounded-lg my-4" :color="cardColor" elevation="1">
      <v-card-text class="d-flex align-center ga-3 pa-4">
        <v-select
          v-model="movieStore.selectedSort"
          :bg-color="selectBgColor"
          class="filter-select"
          density="compact"
          hide-details
          :items="sortItems"
          style="max-width: 150px;"
          variant="solo-filled"
        >
          <template #selection="{ item }">
            <span class="text-body-2" :class="textColor">{{ item.title }}</span>
          </template>
        </v-select>

        <v-text-field
          v-model="movieStore.searchQuery"
          :bg-color="selectBgColor"
          class="filter-search"
          density="compact"
          hide-details
          placeholder="Search..."
          style="max-width: 250px;"
          variant="solo-filled"
        >
          <template #prepend-inner>
            <v-icon :color="iconColor">mdi-magnify</v-icon>
          </template>
        </v-text-field>

        <v-spacer />

        <v-btn-toggle
          v-model="movieStore.viewMode"
          :bg-color="toggleBgColor"
          class="rounded-lg view-toggle"
          density="compact"
          divided
          mandatory
          variant="flat"
        >
          <v-btn
            class="view-toggle-btn"
            :color="isGridView ? 'primary' : 'transparent'"
            size="small"
            :value="'grid'"
            :variant="isGridView ? 'flat' : 'text'"
          >
            <v-icon :color="isGridView ? 'white' : iconColor">mdi-view-grid</v-icon>
          </v-btn>
          <v-btn
            class="view-toggle-btn"
            :color="isListView ? 'primary' : 'transparent'"
            size="small"
            :value="'list'"
            :variant="isListView ? 'flat' : 'text'"
          >
            <v-icon :color="isListView ? 'white' : iconColor">mdi-view-list</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import { useMovieStore } from '@/stores/movie'

  interface SortItem {
    title: string
    value: string
  }

  const theme = useTheme()
  const movieStore = useMovieStore()
  const searchDebounced = ref<number | null>(null)

  const isDark = computed((): boolean => theme.current.value.dark)
  const cardColor = computed((): string => (isDark.value ? 'surface' : 'white'))
  const selectBgColor = computed((): string => (isDark.value ? 'grey-darken-2' : 'grey-lighten-3'))
  const toggleBgColor = computed((): string => (isDark.value ? 'grey-darken-2' : 'grey-lighten-3'))
  const textColor = computed((): string => (isDark.value ? 'text-grey-lighten-1' : 'text-grey-darken-1'))
  const iconColor = computed((): string => (isDark.value ? 'grey-lighten-1' : 'grey-darken-1'))
  const viewMode = computed((): 'grid' | 'list' => movieStore.viewMode)
  const isGridView = computed((): boolean => viewMode.value === 'grid')
  const isListView = computed((): boolean => viewMode.value === 'list')

  watch(() => movieStore.searchQuery, async () => {
    clearTimeout(searchDebounced.value as number)

    searchDebounced.value = setTimeout(async () => {
      if (movieStore.page === 1) {
        await movieStore.fetch()
      } else {
        movieStore.page = 1
      }
    }, 400)
  })

  const sortItems: SortItem[] = [
    { title: 'Latest', value: 'latest' },
    { title: 'Oldest', value: 'oldest' },
    { title: 'A-Z', value: 'az' },
    { title: 'Z-A', value: 'za' },
  ]
  </script>
