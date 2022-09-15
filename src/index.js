import './css/styles.css';
import Notiflix from 'notiflix';
// import axios from 'axios';
import API from './fetchPictures.js';
import { markupCard } from './markupCard.js';
// const { markupCard } = functionObject;

// let searchQuery = 'moon';
const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearchPictures);

function onSearchPictures(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value;
  // if (!searchQuery) {
  //   return Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  // );
  //   API.fetchPicturesByName(searchQuery)
  //     .then(({ data }) => {
  //       renderPicturesCards(data);
  //     })
  //     .catch(error => console.log('Error!'));
  // }

  // function renderPicturesCards(data) {
  //   refs.gallery.insertAdjacentHTML('beforeend', markupCard(data));
  // }
  API.fetchPicturesByName(searchQuery)
    .then(renderPicturesCards)
    .catch(error => {
      onFetchError(error);
    });
}

function renderPicturesCards(data) {
  const images = data.hits;
  console.log(data.hits);
  const pictureCard = markupCard(images);
  console.log(pictureCard);
  refs.gallery.innerHTML = pictureCard;
}

function onFetchError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
