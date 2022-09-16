import './css/styles.css';
import Notiflix from 'notiflix';
// import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import API from './fetchPictures.js';
import { PicturesApiService } from './API-service';
import { markupCard } from './markupCard.js';

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const picturesApiService = new PicturesApiService();

refs.form.addEventListener('submit', onSearchPictures);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchPictures(event) {
  event.preventDefault();
  clearPicturesGallery();
  picturesApiService.query = event.target.elements.searchQuery.value;
  picturesApiService.resetPage();
  picturesApiService.fetchPicturesByName().then(renderPicturesCards);
}

function onLoadMore() {
  picturesApiService.fetchPicturesByName().then(renderPicturesCards);
}

function renderPicturesCards(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', markupCard(hits));
}

function clearPicturesGallery() {
  refs.gallery.innerHTML = '';
}

// new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionsDelay: 250,
// });

// refs.gallery.addEventListener('click', onCardHandleClick);
// const instance = basicLightbox.create(`<img src="" alt="full-image"/>`);

// function onCardHandleClick(event) {
//   event.preventDefault();
//   console.log(event.target);

//   if (event.target.nodeName !== 'IMG') {
//     return;
//   }
//   let urlOriginalPhoto = event.target.dataset.source;

//   const modalImage = instance.element().querySelector('img');
//   modalImage.src = urlOriginalPhoto;
//   instance.show();
//   const visib = basicLightbox.visible();

//   window.addEventListener('keydown', onEscapeClick);
// }
// function onCloseModal() {
//   instance.close();
//   window.removeEventListener('keydown', onEscapeClick);
// }
// function onEscapeClick(event) {
//   if (event.key === 'Escape') {
//     onCloseModal();
//   }
// }
