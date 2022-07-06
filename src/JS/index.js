import './../css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './pixabayAPI';
// import { observer } from './infiniteScroll';
import { galleryRef, renderGallery, clearGalleryMarkup } from './galleryMarkup';

Notify.init({
  position: 'left-top',
  timeout: 2000,
  cssAnimationStyle: 'from-left',
  showOnlyTheLastOne: true,
});

const formRef = document.querySelector('.search-form');
const loadingAnimationRef = document.querySelector('.loading-animation');

formRef.addEventListener('submit', onFormSubmit);
// loadingAnimationRef.addEventListener('click', onloadMoreBtnClick);

const pixabayAPI = new PixabayAPI();

async function onFormSubmit(e) {
  e.preventDefault();
  loadingAnimationRef.style.display = 'block';
  e.target.elements.submitBtn.disabled = true;
  e.target.elements.searchQuery.disabled = true;
  clearGalleryMarkup();
  pixabayAPI.resetPage();
  const request = e.target.elements.searchQuery.value.trim();
  if (!request) return Notify.info('Input some to search');

  pixabayAPI.searchQuery1 = request;
  try {
    const { hits, totalHits } = await pixabayAPI.fetchImages();
    console.log(hits);
    if (!totalHits)
      return Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    Notify.success(`Hooray! We found ${totalHits} images.`);
    renderGallery(hits);
    lightbox.refresh();
    loadingAnimationRef.style.display = 'none';
    e.target.elements.submitBtn.disabled = false;
    e.target.elements.searchQuery.disabled = false;
    observer.observe(document.querySelector('.scroll-guard'));
  } catch (err) {
    console.log(err.message);
  }

  e.target.reset();
}

async function onloadMoreBtnClick() {
  formRef.elements.submitBtn.disabled = true;
  formRef.elements.searchQuery.disabled = true;
  loadingAnimationRef.style.display = 'block';
  try {
    const { hits, totalHits } = await pixabayAPI.fetchImages();
    if (galleryRef.childElementCount === totalHits) {
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    renderGallery(hits);
    lightbox.refresh();

    // const { height: cardHeight } = document
    //   .querySelector('.gallery')
    //   .firstElementChild.getBoundingClientRect();

    // window.scrollBy({
    //   top: cardHeight * 2,
    //   behavior: 'smooth',
    // });
  } catch (err) {
    console.log(err.message);
    console.log(galleryRef.childElementCount);
  }
  loadingAnimationRef.style.display = 'none';
  formRef.elements.submitBtn.disabled = false;
  formRef.elements.searchQuery.disabled = false;
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

const observerOptions = { rootMargin: '200px', treshold: 1.0 };

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onloadMoreBtnClick();
    }
  });
}, observerOptions);
