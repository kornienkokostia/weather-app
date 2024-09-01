<template>
  <MainNav />
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainNav from './components/MainNav.vue';
import { useWeatherStore } from './store/weather';
import { onMounted } from 'vue';
import { FAV_LOCAL_STORAGE_KEY } from './helpers/const';
import { ICity, IData, IDataLookUpRes } from './helpers/interfaces';

const weatherStore = useWeatherStore();

onMounted(async () => {
  const favorites = localStorage.getItem(FAV_LOCAL_STORAGE_KEY);
  if (favorites) {
    const favData: ICity[] = JSON.parse(favorites);
    const setupData: IData[] = favData.map((el, i) => {
      return {
        id: (+Date.now().toString() + i).toString(),
        city: el,
        isFavorited: true,
        weather: [],
      };
    });
    weatherStore.setData(setupData);
  }
  const ipResp = await fetch('https://api64.ipify.org?format=json');
  const ipData = await ipResp.json();
  const userResp = await fetch(
    `https://apiip.net/api/check?ip=${ipData.ip}&accessKey=bb8fdd34-2e57-49f5-b73b-4013da115728`,
  );
  const userData: IDataLookUpRes = await userResp.json();

  weatherStore.addItem({
    name: userData.city,
    lat: userData.latitude,
    lon: userData.longitude,
    local_names: { en: userData.city },
  });
});
</script>

<style scoped lang="scss">
.main {
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 30px 0;
}
</style>
