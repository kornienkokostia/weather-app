<template>
  <div class="spinner" :class="`${size} ${theme}`">
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  size: 'tiny' | 'small' | 'middle' | 'big';
  theme: 'light' | 'dark';
}>();
</script>

<style scoped>
.spinner {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1.04em;
}
.spinner.light {
  --blade-main-color: #ffffff;
  --blade-faded-color: rgba(255, 255, 255, 0.25);
}
.spinner.dark {
  --blade-main-color: #343232;
  --blade-faded-color: rgba(52, 50, 50, 0.25);
}
.spinner.tiny {
  font-size: 20px;
}
.spinner.small {
  font-size: 27px;
}
.spinner.middle {
  font-size: 35px;
}
.spinner.big {
  font-size: 40px;
}
.spinner.center {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.spinner .spinner-blade {
  position: absolute;
  left: 0.4629em;
  bottom: 0;
  width: 0.074em;
  height: 0.2777em;
  border-radius: 0.0555em;
  background-color: transparent;
  transform-origin: center -0.25em;
  animation: spinner-fade 1s infinite linear;
}
.spinner .spinner-blade:nth-child(1) {
  animation-delay: -1s;
  transform: rotate(0deg);
}
.spinner .spinner-blade:nth-child(2) {
  animation-delay: -0.917s;
  transform: rotate(30deg);
}
.spinner .spinner-blade:nth-child(3) {
  animation-delay: -0.834s;
  transform: rotate(60deg);
}
.spinner .spinner-blade:nth-child(4) {
  animation-delay: -0.751s;
  transform: rotate(90deg);
}
.spinner .spinner-blade:nth-child(5) {
  animation-delay: -0.668s;
  transform: rotate(120deg);
}
.spinner .spinner-blade:nth-child(6) {
  animation-delay: -0.585s;
  transform: rotate(150deg);
}
.spinner .spinner-blade:nth-child(7) {
  animation-delay: -0.502s;
  transform: rotate(180deg);
}
.spinner .spinner-blade:nth-child(8) {
  animation-delay: -0.419s;
  transform: rotate(210deg);
}
.spinner .spinner-blade:nth-child(9) {
  animation-delay: -0.336s;
  transform: rotate(240deg);
}
.spinner .spinner-blade:nth-child(10) {
  animation-delay: -0.253s;
  transform: rotate(270deg);
}
.spinner .spinner-blade:nth-child(11) {
  animation-delay: -0.17s;
  transform: rotate(300deg);
}
.spinner .spinner-blade:nth-child(12) {
  animation-delay: -0.087s;
  transform: rotate(330deg);
}
@keyframes spinner-fade {
  0% {
    background-color: var(--blade-main-color);
  }
  100% {
    background-color: var(--blade-faded-color);
  }
}
</style>
