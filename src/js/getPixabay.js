import axios from 'axios';
const APIKEY = '28401377-e234095eda63cbe54e5a64269';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class GetPixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const params = new URLSearchParams({
      key: APIKEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    const { data } = await axios.get(`?${params}`);
    this.incrementPage();
    return data;
  }

  get searchQuery1() {
    return this.searchQuery;
  }

  set searchQuery1(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
