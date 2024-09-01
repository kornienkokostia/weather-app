<template>
  <div class="confirmation-popup" v-if="showConfirmation">
    <div
      class="confirmation-popup-overlay"
      :class="`${open ? 'open' : ''}${close ? 'close' : ''}`">
      <div
        class="confirmation-popup-content"
        :class="`${open ? 'open' : ''}${close ? 'close' : ''}`">
        <div class="confirmation-popup-text">
          <h5 class="confirmation-popup-title">{{ title }}</h5>
          <p v-if="description" class="confirmation-popup-description">
            {{ description }}
          </p>
        </div>
        <div class="confirmation-popup-action-btns">
          <button
            class="confirmation-popup-btn"
            :class="{ 'one-btn': oneBtn }"
            @click="
              () => {
                onClosing();
              }
            ">
            {{ noBtnName }}
          </button>
          <div class="confirmation-popup-divider"></div>
          <button
            v-if="!oneBtn"
            class="confirmation-popup-btn"
            :class="redYesBtn ? 'red-btn' : ''"
            @click="onYesBtnClick">
            {{ yesBtnName }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  showConfirmation: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onYesClick?: () => void;
  noBtnName: string;
  yesBtnName?: string;
  redYesBtn?: boolean;
  oneBtn?: boolean;
}>();

const open = ref<boolean>(false);
const close = ref<boolean>(false);

watch(
  () => props.showConfirmation,
  val => {
    if (val) {
      open.value = true;
      close.value = false;
    } else {
      open.value = false;
      close.value = false;
    }
  },
);

const onClosing = () => {
  open.value = false;
  close.value = true;
  setTimeout(() => {
    props.onClose();
  }, 300);
};
const onYesBtnClick = () => {
  onClosing();
  props.onYesClick?.();
};
</script>

<style scoped lang="scss">
.confirmation-popup-content.open {
  animation: scale-in 0.15s linear;
}
.confirmation-popup-overlay.open {
  animation: fade-in 0.15s linear;
}
.confirmation-popup-content.close {
  animation: fade-out 0.3s linear normal forwards;
}
.confirmation-popup-overlay.close {
  animation: fade-out 0.3s linear normal forwards;
}

.confirmation-popup {
  position: fixed;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
  right: 0;
  top: 0;
  z-index: 10000;
}
.confirmation-popup-overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirmation-popup-content {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: fit-content;
  background-color: #ffffff;
  border-radius: 12px;
}
@keyframes scale-in {
  0% {
    transform: scale(1.15);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.confirmation-popup-text {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 17px 25px;
}
.confirmation-popup-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
}
.confirmation-popup-description {
  margin: 0;
  text-align: center;
  font-size: 14px;
}
.confirmation-popup-action-btns {
  display: flex;
  border-top: 1px solid #dfe0e3;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  overflow: hidden;
}
.confirmation-popup-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(50% - 0.2px);
  border: none;
  background-color: transparent;
  font-size: 17px;
  padding: 10px;
  color: #0071eb;
  cursor: pointer;
}
.confirmation-popup-btn.one-btn {
  width: 100%;
}
.red-btn {
  color: #d60017;
}
.confirmation-popup-btn:active {
  background-color: #dfe0e3;
}
.confirmation-popup-divider {
  width: 0.6px;
  background-color: #dfe0e3;
}
.confirmation-popup-textarea {
  display: flex;
  align-items: center;
  border-radius: 7px !important;
  background-color: #ffffff !important;
  outline: none;
  border: none;
  margin-top: 10px;
  line-height: initial;
  font-size: 15px;
  resize: none;
  height: 34px;
  font-family: 'SF Pro Display', sans-serif;
  padding: 7px 8px !important;
  overflow: hidden;
  border: 1px solid #a8adb4;
  &::placeholder {
    color: #a8adb4;
  }
}
</style>
