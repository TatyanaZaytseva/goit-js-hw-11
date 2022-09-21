import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PicturesApiService } from './API-service';
import { markupCard } from './markupCard.js';
import { refs } from './refs';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

const picturesApiService = new PicturesApiService();

refs.form.addEventListener('submit', onSearchPictures);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchPictures(event) {
  event.preventDefault();
  refs.loadMoreBtn.classList.add('is-hidden');
  picturesApiService.query = event.target.elements.searchQuery.value;
  picturesApiService.resetPage();
  picturesApiService.fetchPicturesByName().then(data => {
    clearPicturesGallery();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    renderPicturesCards(data.hits);
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
}

function onLoadMore() {
  picturesApiService.fetchPicturesByName().then(data => {
    renderPicturesCards(data.hits);
    lightbox.refresh();
    if (refs.gallery.children.length > data.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
  });
}

function renderPicturesCards(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', markupCard(hits));
}

function clearPicturesGallery() {
  refs.gallery.innerHTML = '';
}
