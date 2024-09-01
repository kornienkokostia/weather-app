<template>
  <div class="favorites">
    <WeatherCard
      v-for="el in weatherStore.data.filter(el => el.isFavorited)"
      :data="el"
      :id="el.id"
      :key="el.id"
      :mode="'favorites'" />
  </div>
</template>

<script setup lang="ts">
import WeatherCard from '../components/WeatherCard.vue';
import { useWeatherStore } from '../store/weather';

const weatherStore = useWeatherStore();
</script>

<style scoped>
.favorites {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
