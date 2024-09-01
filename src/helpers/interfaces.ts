export interface ICity {
  name: string;
  lat: number;
  lon: number;
  state?: string;
  local_names: {
    en: string;
    uk?: string;
  }
}

interface MainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Weather {
  main: string;
  description: string;
}

interface Wind {
  speed: number;
}

export interface IWeatherData {
  dt: number;
  main: MainInfo;
  weather: Weather[];
  wind: Wind;
  dt_txt: string;
  count?: number
}

export interface IData {
  id: string;
  isFavorited: boolean;
  city?: ICity;
  weather?: IWeatherData[];
}

export type CardMode = 'day' | '5-days'

export interface IDataLookUpRes {
  city: string;
  latitude: number;
  longitude: number
}