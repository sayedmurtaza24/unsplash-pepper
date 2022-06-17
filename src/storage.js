function saveSearchTerm(searchTerm) {
   try {
      const recentSearches = new Set(JSON.parse(localStorage.getItem('recentSearches') || []));
      recentSearches.add(searchTerm);
      localStorage.setItem('recentSearches', JSON.stringify(Array.from(recentSearches)));
   } catch (err) {
      localStorage.setItem('recentSearches', JSON.stringify([searchTerm]));
   }
}

function getSearchTerms() {
   return Array.from(new Set(JSON.parse(localStorage.getItem('recentSearches') || [])));
}

export { saveSearchTerm, getSearchTerms}