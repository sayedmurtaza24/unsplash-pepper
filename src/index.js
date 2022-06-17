import './styles/main.scss';
import { saveSearchTerm } from './storage';
import getData from './unsplash';
import { attachImages, autocomplete } from './dom';

autocomplete(document.getElementById('search-input'));

const button = document.querySelector('.nav__search-btn');
const searchResult = document.querySelector('.nav__search-input');

button.addEventListener('click', () => {
  saveSearchTerm(searchResult.value);
  window.history.pushState({ searchTerm: searchResult.value }, '', `/?search=${searchResult.value}`);
  window.dispatchEvent(new PopStateEvent('popstate', { state: { searchTerm: searchResult.value } }));
});

window.addEventListener('popstate', ({ state }) => {
  searchResult.value = state.searchTerm;
  getData(state.searchTerm, attachImages);
});
// when the page is reloaded
window.addEventListener('DOMContentLoaded', () => {
  const urlQueryParams = new URLSearchParams(window.location.search);
  if (urlQueryParams.get('search')) {
    searchResult.value = urlQueryParams.get('search');
    getData(urlQueryParams.get('search'), attachImages);
  }
});
