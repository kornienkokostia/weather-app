<template>
  <div class="home">
    <WeatherCard
      v-for="el in weatherStore.data.filter(el => !el.isFavorited)"
      :data="el"
      :id="el.id"
      :key="el.id"
      :set-delete-id="(id: string) => {
        deleteId = id
        showDeleteConfirmation = true
      }"
      :show-cant-add-to-fav="() => (showCantFavConfirmation = true)"
      :mode="'normal'" />
  </div>
  <ConfirmationPopup
    :show-confirmation="showDeleteConfirmation"
    :on-close="() => (showDeleteConfirmation = false)"
    :title="$t('deletePopupTitle')"
    :description="$t('deletePopupMsg')"
    :red-yes-btn="true"
    :no-btn-name="$t('no')"
    :yes-btn-name="$t('yes')"
    :on-yes-click="onDeleteItem" />
  <ConfirmationPopup
    :show-confirmation="showCantFavConfirmation"
    :on-close="() => (showCantFavConfirmation = false)"
    :title="$t('addToFavPopupTitle')"
    :description="$t('addToFavPopupMsg')"
    :no-btn-name="$t('okay')"
    :one-btn="true" />
</template>

<script setup lang="ts">
import WeatherCard from '../components/WeatherCard.vue';
import { useWeatherStore } from '../store/weather';
import ConfirmationPopup from '../components/ConfirmationPopup.vue';
import { ref } from 'vue';

const weatherStore = useWeatherStore();
const showDeleteConfirmation = ref<boolean>(false);
const showCantFavConfirmation = ref<boolean>(false);
const deleteId = ref<string>('');

const onDeleteItem = () => {
  weatherStore.deleteItem(deleteId.value);
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
