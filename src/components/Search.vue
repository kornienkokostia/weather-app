<template>
  <div class="select">
    <SearchIcon class="select-icon" />
    <input
      type="text"
      class="select-input"
      :value="val"
      :placeholder="placeholder"
      @input="onInput" />
    <div class="select-items" v-if="showSelectList">
      <div
        v-for="el in citiesArr"
        class="select-item"
        :key="el.lat"
        @click="onItemClick(el)">
        {{ `${el.name}${el.state ? `, ${el.state}` : ''}` }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICity } from '../helpers/interfaces';
import SearchIcon from './icons/SearchIcon.vue';

interface IProps {
  val: string;
  placeholder: string;
  onInput: (e: Event) => void;
  showSelectList: boolean;
  citiesArr: ICity[];
  onItemClick: (val: ICity) => void;
}
defineProps<IProps>();
</script>

<style scoped lang="scss">
.select {
  display: flex;
  position: relative;
  max-width: 250px;
  &-icon {
    position: absolute;
    left: 7px;
    top: 8px;
    color: rgb(142, 142, 147);
  }
  &-input {
    width: 100%;
    padding: 7px 7px 7px 28px;
    border-radius: 10px;
    background-color: rgb(225, 225, 231);
    border: none;
    outline: none;
    font-family: 'SF UI Text';
    font-size: 15px;
    &::placeholder {
      color: rgb(142, 142, 147);
    }
  }
  &-items {
    position: absolute;
    top: 36px;
    border-radius: 10px;
    background-color: rgb(225, 225, 231);
    width: 100%;
    overflow: hidden;
    z-index: 2;
  }
  &-item {
    padding: 7px 12px;
    position: relative;
    cursor: pointer;
    &:not(:last-of-type):after {
      content: '';
      bottom: 0;
      position: absolute;
      width: 100%;
      height: 1px;
      left: 0;
      background-color: rgb(206, 206, 212);
    }
    &:hover {
      background-color: rgb(206, 206, 212);
    }
  }
}
</style>
