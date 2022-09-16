import './css/styles.css';
import Notiflix from 'notiflix';
// import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import API from './fetchPictures.js';
import { markupCard } from './markupCard.js';

let searchQuery = '';
const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearchPictures);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchPictures(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value;
  if (!searchQuery) {
    refs.gallery.innerHTML = '';
    return;
  }
  API.fetchPicturesByName(searchQuery)
    .then(renderPicturesCards)
    .catch(error => {
      console.log(error);
    });
}

function renderPicturesCards(data) {
  const images = data.hits;
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  const pictureCard = markupCard(images);
  refs.gallery.innerHTML = pictureCard;
}

function onLoadMore() {
  API.fetchPicturesByName(searchQuery)
    .then(renderPicturesCards)
    .catch(error => {
      console.log(error);
    });
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

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
