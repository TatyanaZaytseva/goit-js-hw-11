export function markupCard(hits) {
  return hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="gallery__item"><div class="gallery__photo">
   <a class="gallery__link" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a></div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b></br>${likes}
    </p>
    <p class="info-item">
      <b>Views</b></br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b></br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b></br>${downloads}
    </p>
  </div>
</div>
`;
      }
    )
    .join('');
}
