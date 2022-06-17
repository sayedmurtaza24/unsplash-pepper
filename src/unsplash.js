function getData(searchTerm, callback) {
  fetch(`https://unsplash-pepper.herokuapp.com/api/get-unsplash-photo/?searchTerm=${searchTerm}`).then(data => data.json()).then(callback);
}

export default getData;
