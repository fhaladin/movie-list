<template>
  <v-container class="py-0">
    <v-row>
      <v-col
        v-for="i in 4"
        :key="i"
        cols="12"
        lg="4"
        md="6"
      >
        <ui-card />
      </v-col>
    </v-row>

    <v-pagination class="my-6" :length="1" total-visible="10" />
  </v-container>
</template>

<script lang="ts" setup>
//
</script>
