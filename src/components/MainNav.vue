<template>
  <button class="nav-settings-btn" @click="() => (showSettings = true)">
    <SettingsIcon width="30" height="30" />
  </button>
  <div class="nav-settings" v-if="showSettings">
    <Settings />
  </div>
  <nav class="nav">
    <RouterLink class="nav-link" to="/">{{ $t('home') }}</RouterLink>
    <RouterLink class="nav-link" to="/favorites">{{
      $t('favorites')
    }}</RouterLink>
    <button
      v-if="route.path === '/'"
      class="nav-action"
      @click="() => weatherStore.addItem(undefined)">
      {{ $t('add') }}
    </button>
  </nav>
  <div
    class="nav-settings-backdrop"
    v-if="showSettings"
    @click="() => (showSettings = false)"></div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useWeatherStore } from '../store/weather';
import SettingsIcon from './icons/SettingsIcon.vue';
import Settings from './Settings.vue';
import { ref } from 'vue';

const weatherStore = useWeatherStore();
const route = useRoute();
const showSettings = ref<boolean>(false);
</script>

<style scoped lang="scss">
.nav {
  background-color: rgb(245, 245, 247);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  gap: 20px;
  width: 100%;
  position: relative;
  &-link {
    text-decoration: none;
    color: #000000;
    &.router-link-exact-active {
      color: #0071eb;
    }
  }
  &-action {
    position: absolute;
    right: 8px;
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 16px;
    padding: 7px 12px;
    cursor: pointer;
    color: #0071eb;
    &:active {
      filter: opacity(0.7);
    }
  }
  &-settings {
    position: absolute;
    z-index: 3;
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    top: 48px;
    left: 17px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 277px;
    &-btn {
      position: absolute;
      left: 20px;
      fill: #000000;
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      padding: 0;
      height: 30px;
      top: 7px;
      z-index: 1;
    }
    &-backdrop {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
  }
}
</style>
