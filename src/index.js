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
  window.dispatchEvent(new Event('popstate'));
});

window.addEventListener('popstate', () => {
  getData(window.history.state.searchTerm, attachImages);
});
// when the page is reloadedd
window.addEventListener('DOMContentLoaded', () => {
  const urlQueryParams = new URLSearchParams(window.location.search);
  if (urlQueryParams.get('search')) {
    getData(urlQueryParams.get('search'), attachImages);
  }
});
