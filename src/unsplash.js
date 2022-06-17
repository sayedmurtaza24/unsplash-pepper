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

export { getData }