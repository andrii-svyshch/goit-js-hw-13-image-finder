const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23541040-6cd4bf6b7c4617c11fc95022a';
const params = `?image_type=photo&orientation=horizontal`;

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
  }

  async fetchImg() {
    const url = `${BASE_URL}${params}&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${API_KEY}`;
    const response = await fetch(url);
    const { hits } = await response.json();
    this.page += 1;
    return hits;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
