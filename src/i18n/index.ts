import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    home: 'Home',
    favorites: 'Favorites',
    add: 'Add',
    search: 'Search',
    day: 'Day',
    days: '5 Days',
    h: 'H',
    l: 'L',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    preasure: 'Preasure',
    wind: 'Wind',
    hPa: 'hPa',
    mS: 'm/s',
    deletePopupTitle: 'Delete card?',
    deletePopupMsg: 'This card will be permanently deleted.',
    yes: 'Yes',
    no: 'No',
    addToFavPopupTitle: 'Maximum favorites limit reached!',
    addToFavPopupMsg: 'You can only add 5 cards to favorites. Please delete one before adding a new one.',
    okay: 'Okay',
    settings: 'Settings',
    language: 'Language'
  },
  uk: {
    home: 'Головна',
    favorites: 'Обрані',
    add: 'Додати',
    search: 'Пошук',
    day: 'День',
    days: '5 Днів',
    h: 'В',
    l: 'Н',
    feelsLike: 'Відчувається як',
    humidity: 'Вологість',
    preasure: 'Тиск',
    wind: 'Вітер',
    hPa: 'гПа',
    mS: 'м/с',
    deletePopupTitle: 'Видалити картку?',
    deletePopupMsg: 'Ця карта буде видалина на завжди.',
    yes: 'Так',
    no: 'Ні',
    addToFavPopupTitle: 'Максимальна кількість вподобаних карток достигнута!',
    addToFavPopupMsg: 'Ви можете зберегти тільки 5 карток в улюблені. Будь ласка видалить 1 щоб додати нову.',
    okay: 'Добре',
    settings: 'Налаштування',
    language: 'Мова'
  },
};

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  legacy: false,
});


export default i18n;