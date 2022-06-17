import { getSearchTerms, saveSearchTerm } from '../src/storage';

beforeAll(() => {
   class LocalStorageMock {
      constructor() { this.store = {}; }
      clear() { this.store = {}; }
      getItem(key) { return this.store[key] || null; }
      setItem(key, value) { this.store[key] = String(value); }
      removeItem(key) { delete this.store[key]; }
   }
   global.localStorage = new LocalStorageMock();
})

afterEach(() => {
   global.localStorage.clear();
})

test('saves searched term to the localStorage', () => {
   saveSearchTerm('apple');
   expect(global.localStorage.store).toEqual({ recentSearches: "[\"apple\"]" });
})

test('loads back all the searched terms into an array', () => {
   saveSearchTerm('apple');
   saveSearchTerm('pirate');
   expect(getSearchTerms()).toEqual(['apple', 'pirate']);
})