<template>
  <v-toolbar>
    <v-container class="d-flex align-center justify-space-between">
      <v-toolbar-title class="cursor-pointer font-weight-bold" @click="router.push('/')">
        MovieList
      </v-toolbar-title>

      <v-spacer />
      <v-btn icon="mdi-heart-outline" to="/favorite" />
      <v-btn :icon="darkModeIcon" @click="theme.toggle()" />
    </v-container>
  </v-toolbar>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  const router = useRouter()
  const isDark = computed(() => theme.current.value.dark)
  const darkModeIcon = computed(() => isDark.value ? 'mdi-white-balance-sunny' : 'mdi-weather-night')
</script>
