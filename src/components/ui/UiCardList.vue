<template>
  <v-card class="list-card" :elevation="elevation" @mouseleave="elevation = 1" @mouseover="elevation = 3">
    <v-btn class="fav-button" icon="mdi-heart-outline" size="small" />

    <div class="d-flex">
      <div class="image-container">
        <v-img
          cover
          height="120px"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          width="120px"
        />
      </div>

      <div class="content">
        <v-card-title class="content-title pl-4 pb-2">
          Oppenheimer
          <div class="tag">
            <v-chip v-if="isTrending" color="orange" size="x-small" variant="flat">
              <p class="text-caption text-white">Trending</p>
            </v-chip>
            <v-chip v-if="isEditorChoice" color="blue" size="x-small" variant="flat">
              <p class="text-caption text-white">Editor's Choice</p>
            </v-chip>
          </div>
        </v-card-title>

        <div>
          <v-card-subtitle class="pl-4 pb-2">
            2003 - History - Rating: {{ rating }}
          </v-card-subtitle>
          <v-card-subtitle class="pl-4 pb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum magnam, unde quos distinctio sequi aut.
          </v-card-subtitle>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { randomBoolean, randomNumber } from '@/utils/randomizer'

  const elevation = ref<number>(1)
  const isTrending = ref<boolean>(randomBoolean())
  const isEditorChoice = ref<boolean>(randomBoolean())
  const rating = ref<number>(randomNumber(4, 10))
</script>

<style lang="scss" scoped>
.list-card {
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateX(4px);
    transition: transform 0.3s ease-in-out;

    .image-container {
      :deep() {
        .v-img {
          img {
            transform: scale(1.1);
            transition: transform 0.3s ease-in-out;
          }
        }
      }
    }
  }
}

.image-container {
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
}

.fav-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.content-title {
  display: flex;
  gap: 10px;
}

.tag {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
