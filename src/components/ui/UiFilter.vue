<template>
  <v-container>
    <v-card class="rounded-lg my-4" :color="cardColor" elevation="1">
      <v-card-text class="d-flex align-center ga-3 pa-4">
        <v-select
          :bg-color="selectBgColor"
          class="filter-select"
          density="compact"
          hide-details
          :items="sortItems"
          :model-value="selectedSort"
          style="max-width: 150px;"
          variant="solo-filled"
          @update:model-value="handleSortChange"
        >
          <template #selection="{ item }">
            <span class="text-body-2" :class="textColor">{{ item.title }}</span>
          </template>
        </v-select>

        <v-text-field
          :bg-color="selectBgColor"
          class="filter-search"
          density="compact"
          hide-details
          :model-value="searchQuery"
          placeholder="Search..."
          style="max-width: 250px;"
          variant="solo-filled"
          @update:model-value="handleSearchChange"
        >
          <template #prepend-inner>
            <v-icon :color="iconColor">mdi-magnify</v-icon>
          </template>
        </v-text-field>

        <v-spacer />

        <v-btn-toggle
          :bg-color="toggleBgColor"
          class="rounded-lg view-toggle"
          density="compact"
          divided
          mandatory
          :model-value="viewMode"
          variant="flat"
          @update:model-value="handleViewModeChange"
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
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  interface SortItem {
    title: string
    value: string
  }

  interface Props {
    searchQuery: string
    selectedSort: string
    viewMode: 'grid' | 'list'
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    'update:searchQuery': [value: string]
    'update:selectedSort': [value: string]
    'update:viewMode': [value: 'grid' | 'list']
  }>()

  const theme = useTheme()

  const isDark = computed((): boolean => theme.current.value.dark)
  const cardColor = computed((): string => (isDark.value ? 'surface' : 'white'))
  const selectBgColor = computed((): string => (isDark.value ? 'grey-darken-2' : 'grey-lighten-3'))
  const toggleBgColor = computed((): string => (isDark.value ? 'grey-darken-2' : 'grey-lighten-3'))
  const textColor = computed((): string => (isDark.value ? 'text-grey-lighten-1' : 'text-grey-darken-1'))
  const iconColor = computed((): string => (isDark.value ? 'grey-lighten-1' : 'grey-darken-1'))
  const isGridView = computed((): boolean => props.viewMode === 'grid')
  const isListView = computed((): boolean => props.viewMode === 'list')

  function handleSearchChange (value: string): void {
    emit('update:searchQuery', value)
  }

  function handleSortChange (value: string): void {
    emit('update:selectedSort', value)
  }

  function handleViewModeChange (value: 'grid' | 'list'): void {
    emit('update:viewMode', value)
  }

  const sortItems: SortItem[] = [
    { title: 'Latest', value: 'latest' },
    { title: 'Oldest', value: 'oldest' },
    { title: 'A-Z', value: 'az' },
    { title: 'Z-A', value: 'za' },
  ]
</script>
