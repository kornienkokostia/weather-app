import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ICity, IData, IWeatherData } from '../helpers/interfaces'
import { FAV_LOCAL_STORAGE_KEY } from '../helpers/const'

export const useWeatherStore = defineStore('weather', () => {
  const data = ref<IData[]>([])

  const addItem = (city?: ICity) => {
    data.value.push({
      id: Date.now().toString(),
      isFavorited: false,
      city: city,
      weather: []
    })
  }

  const setItem = (id: string, city: ICity, weather: IWeatherData[]) => {
    const item = data.value.find(el => el.id === id)
    if (item) {
      item.city = city
      item.weather = weather
    }
  }

  const deleteItem = (id: string) => {
    data.value = data.value.filter(el => el.id !== id)
  }

  const toggleFavorites = (id: string) => {
    const item = data.value.find(el => el.id === id)
    if (item) {
      item.isFavorited = !item.isFavorited
    }
    console.log(data.value)
    const favorites = data.value.filter(el => el.isFavorited).map(el => el.city)
    localStorage.setItem(FAV_LOCAL_STORAGE_KEY, JSON.stringify(favorites))
  }

  const setData = (val: IData[]) => {
    data.value = val
  }

  const favCount = computed<number>(() => {
    const arr = data.value.filter(el => el.isFavorited)
    console.log(arr)
    return arr.length
  })

  return { data, addItem, setItem, deleteItem, toggleFavorites, setData, favCount }
})
