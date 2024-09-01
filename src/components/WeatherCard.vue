<template>
  <div class="weather-card">
    <div class="weather-card-header">
      <div>
        <Search
          v-if="props.mode === 'normal'"
          :val="cityInput"
          :placeholder="`${$t('search')}`"
          :cities-arr="citiesArr"
          :show-select-list="showSelectList"
          :on-input="onInput"
          :on-item-click="onItemClick" />
      </div>

      <div class="weather-card-actions">
        <button
          type="button"
          class="weather-card-action-btn weather-card-action-btn-favorite"
          :class="{ favorite: props.data.isFavorited }"
          @click="
            () => {
              if (weatherStore.favCount <= 4 || route.path === '/favorites') {
                weatherStore.toggleFavorites(props.id);
              } else {
                props.showCantAddToFav?.();
              }
            }
          ">
          <FavoriteIcon width="21" height="20" />
        </button>
        <button
          type="button"
          v-if="props.mode === 'normal'"
          class="weather-card-action-btn weather-card-action-btn-delete"
          @click="() => setDeleteId?.(props.id)">
          <DeleteIcon />
        </button>
      </div>
    </div>
    <div
      class="mode-switcher"
      :class="{ favorites: props.mode === 'favorites' }">
      <div class="mode-switcher-el" @click="() => onModeChange('day')">
        {{ $t('day') }}
      </div>
      <div class="mode-switcher-el" @click="() => onModeChange('5-days')">
        {{ $t('days') }}
      </div>
      <div
        class="mode-switcher-bg"
        :class="mode === 'day' ? 'day' : 'five-days'"></div>
    </div>
    <div class="weather-card-info">
      <div class="weather-card-info-basic-loading" v-if="isLoading">
        <Loader :size="'small'" :theme="'dark'" />
      </div>
      <div class="weather-card-info-basic" v-else>
        <p class="weather-card-info-city">
          {{
            curCity?.name
              ? $i18n.locale === 'en'
                ? curCity.local_names.en
                : curCity.local_names?.uk || curCity.local_names.en
              : '-'
          }}
        </p>
        <h1 class="weather-card-info-main-temp">
          {{ curWeather[0]?.main.temp.toFixed(0) || 0 }}°
        </h1>
        <p class="weather-card-info-descr">
          {{
            ($i18n.locale === 'en'
              ? curWeather[0]?.weather[0].main
              : capFirstLetter(curWeather[0]?.weather[0].description)) || '-'
          }}
        </p>
        <div class="weather-card-info-min-max-temp">
          <span
            >{{ $t('h') }}:{{
              curWeather[0]?.main.temp_max.toFixed(0) || 0
            }}°</span
          >
          <span
            >{{ $t('l') }}:{{
              curWeather[0]?.main.temp_min.toFixed(0) || 0
            }}°</span
          >
        </div>
      </div>
      <div class="weather-card-info-tiles-loading" v-if="isLoading">
        <Loader :size="'small'" :theme="'dark'" />
      </div>
      <div class="weather-card-info-tiles" v-else>
        <div class="weather-card-info-tile">
          <p class="weather-card-info-tile-title">{{ $t('feelsLike') }}</p>
          <p class="weather-card-info-tile-val">
            {{ curWeather[0]?.main.feels_like.toFixed(0) || 0 }}°
          </p>
        </div>
        <div class="weather-card-info-tile">
          <p class="weather-card-info-tile-title">{{ $t('humidity') }}</p>
          <p class="weather-card-info-tile-val">
            {{ curWeather[0]?.main.humidity || 0 }}%
          </p>
        </div>
        <div class="weather-card-info-tile">
          <p class="weather-card-info-tile-title">{{ $t('preasure') }}</p>
          <p class="weather-card-info-tile-val">
            {{ curWeather[0]?.main.pressure || 0 }} <span>{{ $t('hPa') }}</span>
          </p>
        </div>
        <div class="weather-card-info-tile">
          <p class="weather-card-info-tile-title">{{ $t('wind') }}</p>
          <p class="weather-card-info-tile-val">
            {{ curWeather[0]?.wind.speed.toFixed(0) || 0 }}
            <span>{{ $t('mS') }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="weather-card-chart">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { API_BASE } from '../helpers/const';
import { CardMode, ICity, IData, IWeatherData } from '../helpers/interfaces';
import { capFirstLetter, debounce } from '../helpers/helpers';
import Search from './Search.vue';
import FavoriteIcon from './icons/FavoriteIcon.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import Chart, {
  BubbleDataPoint,
  ChartTypeRegistry,
  ScatterDataPoint,
} from 'chart.js/auto';
import { useWeatherStore } from '../store/weather';
import { useRoute } from 'vue-router';
import Loader from './Loader.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  data: IData;
  id: string;
  setDeleteId?: (id: string) => void;
  mode: 'normal' | 'favorites';
  showCantAddToFav?: () => void;
}>();

const cityInput = ref<string>('');
const citiesArr = ref<ICity[]>([]);
const showSelectList = ref<boolean>(false);
const curCity = ref<ICity>();
const curWeather = ref<IWeatherData[]>([]);
const chartRef = ref<HTMLCanvasElement>();
let chart: Chart<
  keyof ChartTypeRegistry,
  (number | ScatterDataPoint | BubbleDataPoint)[],
  unknown
> | null = null;
const weatherStore = useWeatherStore();
const route = useRoute();
const mode = ref<CardMode>('day');
const isLoading = ref<boolean>(false);
const i18n = useI18n();

onMounted(() => {
  if (props.data) {
    curCity.value = props.data.city;
    curWeather.value = props.data.weather || [];

    if (props.data.city && !props.data.weather?.length) {
      onItemClick(props.data.city);
    }
  }
  drawChart();
});

watch(i18n.locale, () => {
  if (props.data.city) {
    onItemClick(props.data.city);
  }
});

const onInput = (e: Event) => {
  const el = e.target as HTMLInputElement;
  cityInput.value = el.value;
  onSearch(e);
};

const onSearch = debounce(async (e: Event) => {
  const el = e.target as HTMLInputElement;
  const val = el.value;
  if (cityInput.value) {
    const res = await fetch(
      `${API_BASE}/geo/1.0/direct?q=${val}&limit=5&appid=7f78d5e9727f339144d81499b4494242`,
    );
    const data = await res.json();
    // console.log(data);
    showSelectList.value = true;
    citiesArr.value = data;
  }
  if (!cityInput.value) {
    showSelectList.value = false;
    citiesArr.value = [];
  }
}, 300);

const onItemClick = async (val: ICity) => {
  cityInput.value = '';
  showSelectList.value = false;
  curCity.value = val;
  isLoading.value = true;
  const res = await fetch(
    `${API_BASE}/data/2.5/forecast?lat=${curCity.value.lat}&lon=${curCity.value.lon}&units=metric&lang=${i18n.locale.value}&appid=7f78d5e9727f339144d81499b4494242`,
  );
  const data = await res.json();
  isLoading.value = false;
  curWeather.value = data.list;
  weatherStore.setItem(props.id, val, data.list);
  chart?.destroy();
  drawChart();
};

const drawChart = () => {
  chart = new Chart(chartRef.value!, {
    type: 'line',
    data: {
      labels: curWeather.value
        .slice(0, mode.value === 'day' ? 6 : 5)
        .map(el => {
          const date = new Date(el.dt * 1000);
          date.setHours(date.getHours() - 3);
          const hours = date.getHours();
          return mode.value === 'day'
            ? [
                capFirstLetter(
                  date.toLocaleDateString(
                    i18n.locale.value === 'en' ? 'us-US' : 'uk-UA',
                    {
                      weekday: 'short',
                    },
                  ),
                ),
                `${hours < 10 ? `0${hours}` : hours}:00`,
              ]
            : capFirstLetter(
                date.toLocaleDateString(
                  i18n.locale.value === 'en' ? 'us-US' : 'uk-UA',
                  {
                    weekday: 'short',
                  },
                ),
              );
        }),
      datasets: [
        {
          label: '',
          data: curWeather.value
            .slice(0, mode.value === 'day' ? 6 : 5)
            .map(el => +el.main.temp.toFixed(0)),
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const onModeChange = (val: CardMode) => {
  if (mode.value === val) {
    return;
  }
  mode.value = val;
  if (mode.value === 'day') {
    curWeather.value = props.data.weather || [];
  } else {
    const dailyData: IWeatherData[] = [];
    for (const item of props.data.weather || []) {
      const existingInd = dailyData.findIndex(
        el => el.dt_txt.split(' ')[0] === item.dt_txt.split(' ')[0],
      );
      if (existingInd === -1) {
        dailyData.push({
          dt: item.dt,
          main: {
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            pressure: item.main.pressure,
            humidity: item.main.humidity,
          },
          weather: [
            {
              main: item.weather[0].main,
              description: item.weather[0].description,
            },
          ],
          wind: { speed: item.wind.speed },
          dt_txt: item.dt_txt,
          count: 1,
        });
      } else {
        const found = dailyData[existingInd];
        found.main.temp += item.main.temp;
        found.main.feels_like += item.main.feels_like;
        found.main.temp_min += item.main.temp_min;
        found.main.temp_max += item.main.temp_max;
        found.main.pressure += item.main.pressure;
        found.main.humidity += item.main.humidity;
        found.wind.speed += item.wind.speed;
        found.count! += 1;
      }
    }
    dailyData.forEach(el => {
      el.main.temp = +(el.main.temp / el.count!).toFixed(0);
      el.main.feels_like = +(el.main.feels_like / el.count!).toFixed(0);
      el.main.temp_min = +(el.main.temp_min / el.count!).toFixed(0);
      el.main.temp_max = +(el.main.temp_max / el.count!).toFixed(0);
      el.main.pressure = +(el.main.pressure / el.count!).toFixed(0);
      el.main.humidity = +(el.main.humidity / el.count!).toFixed(0);
      el.wind.speed = +(el.wind.speed / el.count!).toFixed(0);
    });
    curWeather.value = dailyData;
  }
  chart?.destroy();
  drawChart();
};
</script>

<style scoped lang="scss">
.weather-card {
  border-radius: 20px;
  background-color: rgb(245, 245, 247);
  padding: 20px;
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  &-header {
    display: flex;
    justify-content: space-between;
    height: 32px;
  }
  &-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    &-basic-loading {
      height: 103px;
      display: flex;
      align-items: center;
    }
    &-city {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: 700;
      height: 13px;
    }
    &-main-temp {
      font-weight: 300;
      font-size: 50px;
      line-height: 40px;
      margin-top: 7px;
    }
    &-descr {
      font-size: 19px;
      font-weight: 500;
      line-height: 17px;
      margin-top: 5px;
      height: 17px;
    }
    &-min-max-temp {
      font-weight: 500;
      font-size: 15px;
      margin-top: 3px;
      display: flex;
      gap: 7px;
      justify-content: center;
    }
    &-tiles {
      display: grid;
      grid-template-columns: repeat(4, 150px);
      justify-content: center;
      width: 100%;
      gap: 20px;
      margin-top: 35px;
      &-loading {
        height: 150px;
        margin-top: 35px;
        display: flex;
        align-items: center;
      }
    }
    &-tile {
      height: 130px;
      background-color: rgb(225, 225, 231);
      border-radius: 10px;
      padding: 10px;
      &-title {
        text-transform: uppercase;
        text-align: left;
        color: rgb(142, 142, 147);
        font-weight: 600;
        font-size: 13px;
      }
      &-val {
        font-size: 30px;
        text-align: left;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        & span {
          font-size: 18px;
        }
      }
    }
  }
  &-actions {
    display: flex;
    align-items: center;
  }
  &-action-btn {
    outline: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    transition: 0.1s;
    &:active {
      filter: opacity(0.7);
    }
    &-delete {
      color: #fa586a;
    }
    &-favorite {
      color: rgb(142, 142, 147);
    }
    &.favorite {
      color: #0071eb;
    }
  }
  &-chart {
    margin-top: 10px;
  }
}
.mode-switcher {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgb(225, 225, 231);
  width: fit-content;
  border-radius: 10px;
  position: relative;
  &.favorites {
    position: absolute;
    top: 20px;
  }
  &-el {
    padding: 7px 10px;
    position: relative;
    z-index: 1;
    cursor: pointer;
    text-align: center;
  }
  &-bg {
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    width: calc(50% - 2.5px);
    height: calc(100% - 5px);
    background-color: rgb(195, 195, 200);
    border-radius: 8px;
    transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: translateX(0%);
    &.five-days {
      transform: translateX(100%);
    }
  }
}
@media screen and (max-width: 768px) {
  .weather-card-info-tiles {
    grid-template-columns: repeat(2, 150px);
  }
}
@media screen and (max-width: 425px) {
  .weather-card-info-tiles {
    grid-template-columns: repeat(2, 120px);
  }
  .weather-card-info-tiles-loading {
    height: 120px;
  }
  .weather-card-info-tile {
    height: 100px;
  }
}
</style>
