import './../css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GetPixabayApi } from './getPixabay';

Notify.init({
  position: 'center-top',
  timeout: 2000,
  cssAnimationStyle: 'from-top',
  showOnlyTheLastOne: true,
});

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.search-form');
const loadMoreBtnRef = document.querySelector('.load-more');

formRef.addEventListener('submit', onFormSubmit);
loadMoreBtnRef.addEventListener('click', onloadMoreBtnClick);

const getPixabayApi = new GetPixabayApi();

function makeGallaryMarkup(searchedImages) {
  return searchedImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p></a>
          </div>
        </div>`
    )
    .join('');
}

function renderGallery(searchedImages) {
  galleryRef.insertAdjacentHTML('beforeend', makeGallaryMarkup(searchedImages));
}

async function onFormSubmit(e) {
  e.preventDefault();
  clearGalleryMarkup();
  getPixabayApi.resetPage();
  const request = e.target.elements.searchQuery.value.trim();
  if (!request) return Notify.info('Input some to search');

  getPixabayApi.searchQuery1 = request;
  try {
    const { hits, totalHits } = await getPixabayApi.fetchImages();
    if (!totalHits)
      return Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    Notify.success(`Hooray! We found ${totalHits} images.`);
    renderGallery(hits);
    lightbox.refresh();
  } catch (err) {
    console.log(err.message);
  }

  e.target.reset();
}

async function onloadMoreBtnClick() {
  try {
    const { hits, totalHits } = await getPixabayApi.fetchImages();
    renderGallery(hits);
    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    console.log(err.message);
  }
}

function clearGalleryMarkup() {
  galleryRef.innerHTML = '';
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});
