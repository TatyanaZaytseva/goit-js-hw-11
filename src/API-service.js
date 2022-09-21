import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY = '29872445-b11cb18030e5a7e55f6afbc9a';
const BASE_URL = 'https://pixabay.com/api/';
const PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPicturesByName() {
    try {
      let url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${PARAMS}&page=${this.page}`;

      const response = await axios.get(url);

      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.incrementPage();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  incrementPage() {
    this.page += 1;
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
