import './styles/main.scss';
import { accessKey } from '../unsplash.config';

function getData(searchTerm, callback) {
  fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=${accessKey}`)
    .then(response => response.json())
    .then(data => callback(
      data.results ? data
        .results
        .map(res => ({
          description: res.description,
          url: res.urls.regular,
        })) : [],
    ));
}

function attachImages(images) {
  const imgElement = images ? images.map(image => `<div class="content__image-container">
     <img class="content__image" src="${image.url}" alt="">
     <div class="content__image-description">
        <p>${image.description || 'No description'}</p>
     </div>
     </div> `).join('') : '';
  document.querySelector('.content__images').innerHTML = imgElement;
}

function saveSearchTerm(searchTerm) {
  try {
    const recentSearches = new Set(JSON.parse(localStorage.recentSearches || [])) || new Set([]);
    recentSearches.add(searchTerm);
    localStorage.setItem('recentSearches', JSON.stringify(Array.from(recentSearches)));
  } catch (err) {
    localStorage.setItem('recentSearches', JSON.stringify([]));
  }
}

function getSearchTerms() {
  return Array.from(new Set(JSON.parse(localStorage.recentSearches || [])));
}

function autocomplete(inp) {
  let currentFocus;
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    return x[currentFocus].classList.add('autocomplete-active');
  }
  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName('autocomplete__items');
    for (let i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  inp.addEventListener('input', () => {
    let b; let i; const
      val = inp.value;
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    const a = document.createElement('DIV');
    a.setAttribute('id', `${inp.id}autocomplete-list`);
    a.setAttribute('class', 'autocomplete__items');
    inp.parentNode.appendChild(a);
    const arr = getSearchTerms();
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        b = document.createElement('DIV');
        b.innerHTML = `<strong>${arr[i].substr(0, val.length)}</strong>`;
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += `<input type='hidden' value='${arr[i]}'>`;
        b.addEventListener('click', () => {
          // eslint-disable-next-line
               inp.value = inp.getElementsByTagName('input')[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
    return null;
  });

  inp.addEventListener('keydown', e => {
    let x = document.getElementById(`${inp.id}autocomplete-list`);
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode === 40) {
      currentFocus += currentFocus;
      addActive(x);
    } else if (e.keyCode === 38) {
      currentFocus -= currentFocus;
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  document.addEventListener('click', e => {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById('search-input'));

const button = document.querySelector('.nav__search-btn');
const searchResult = document.querySelector('.nav__search-input');
button.addEventListener('click', () => {
  saveSearchTerm(searchResult.value);
  window.history.pushState({ searchTerm: searchResult.value },
    'Pepper Unsplash', `/?search=${searchResult.value}`);
  window.dispatchEvent(new Event('popstate'));
});

window.addEventListener('popstate', () => {
  getData(window.history.state.searchTerm, attachImages);
});
// when the page is reloaded
window.addEventListener('DOMContentLoaded', () => {
  const urlQueryParams = new URLSearchParams(window.location.search);
  if (urlQueryParams.get('search')) {
    getData(urlQueryParams.get('search'), attachImages);
  }
});
