<template>
  <v-container>
    <v-card class="rounded-lg my-4" :color="cardColor" elevation="1">
      <v-card-text class="d-flex align-center ga-3 pa-4">
        <v-select
          v-model="selectedYear"
          :bg-color="selectBgColor"
          class="filter-select"
          density="compact"
          hide-details
          :items="yearItems"
          style="max-width: 150px;"
          variant="solo-filled"
        >
          <template #selection="{ item }">
            <span class="text-body-2" :class="textColor">{{ item.title }}</span>
          </template>
        </v-select>

        <v-select
          v-model="selectedSort"
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

        <v-spacer />

        <div class="d-flex align-center ga-2">
          <span class="text-body-2" :class="textColor">Pagination:</span>
          <v-chip
            :class="textColor"
            :color="chipColor"
            size="small"
            variant="flat"
          >
            Classic
          </v-chip>
        </div>

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

  const theme = useTheme()
  const movieStore = useMovieStore()

  const selectedYear = ref<string>('all')
  const selectedSort = ref<string>('latest')

  const isDark = computed(() => theme.current.value.dark)
  const cardColor = computed(() => (isDark.value ? 'surface' : 'white'))
  const selectBgColor = computed(() => (isDark.value ? 'grey-darken-2' : 'grey-lighten-3'))
  const chipColor = computed(() => (isDark.value ? 'grey-darken-2' : 'grey-lighten-3'))
  const toggleBgColor = computed(() => (isDark.value ? 'grey-darken-2' : 'grey-lighten-3'))
  const textColor = computed(() => (isDark.value ? 'text-grey-lighten-1' : 'text-grey-darken-1'))
  const iconColor = computed(() => (isDark.value ? 'grey-lighten-1' : 'grey-darken-1'))
  const viewMode = computed(() => movieStore.viewMode)
  const isGridView = computed(() => viewMode.value === 'grid')
  const isListView = computed(() => viewMode.value === 'list')

  const yearItems = [
    { title: 'All', value: 'all' },
    { title: '2024', value: '2024' },
    { title: '2023', value: '2023' },
    { title: '2022', value: '2022' },
  ]

  const sortItems = [
    { title: 'Latest', value: 'latest' },
    { title: 'Oldest', value: 'oldest' },
    { title: 'A-Z', value: 'az' },
    { title: 'Z-A', value: 'za' },
  ]
  </script>
