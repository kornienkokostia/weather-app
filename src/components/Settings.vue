<template>
  <h2 class="settings-title">{{ $t('settings') }}</h2>
  <div class="settings-item">
    <p class="settings-item-name">{{ $t('language') }}</p>
    <select class="settings-select" v-model="$i18n.locale">
      <option class="settings-select-item" value="en">English</option>
      <option class="settings-select-item" value="uk">Українська</option>
    </select>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.settings {
  &-title {
    padding: 12px 16px;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 1px solid #e2e2e2;
    background-color: rgba(170, 170, 174, 0.15);
  }
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 13px;
  }
  &-divider {
    height: 1px;
    background-color: #e2e2e2;
    margin: 0 10px;
  }
  &-select {
    border-radius: 6px;
    border: none;
    box-shadow: 0 0 0 1px #e2e2e2;
    outline: none;
    padding: 2px;
    width: 110px;
    background-color: rgba(170, 170, 174, 0.15);
    color: #000000;
    cursor: pointer;
  }
}
</style>
