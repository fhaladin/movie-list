<template>
  <v-container class="not-found__container">
    <v-row>
      <v-col class="text-center" cols="12">
        <div class="not-found__content">
          <v-icon
            class="not-found__icon"
            size="120"
          >
            mdi-database-remove-outline
          </v-icon>

          <h1 class="text-h3 font-weight-bold mb-4 mt-8">
            Oops! Data Not Found
          </h1>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.not-found {
  &__container {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  &__icon {
    animation: float 3s ease-in-out infinite;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
