import Notiflix from 'notiflix';

const API_KEY = '29872445-b11cb18030e5a7e55f6afbc9a';
const BASE_URL = 'https://pixabay.com/api/';

export class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPicturesByName() {
    let url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

        this.incrementPage();
        return data.hits;
      });
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
