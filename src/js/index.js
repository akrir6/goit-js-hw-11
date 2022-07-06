import './../css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './pixabayAPI';
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

const pixabayAPI = new PixabayAPI();

async function onFormSubmit(e) {
  e.preventDefault();
  showLoading(true);
  disableFormElements(true);
  clearGalleryMarkup();
  pixabayAPI.resetPage();
  const request = e.target.elements.searchQuery.value.trim();
  if (!request) return Notify.info('Input some to search');

  pixabayAPI.searchQuery1 = request;
  try {
    const { hits, totalHits } = await pixabayAPI.fetchImages();
    if (!totalHits) {
      showLoading(false);
      disableFormElements(false);
      return Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);

    renderGallery(hits);
    lightbox.refresh();
    showLoading(false);
    disableFormElements(false);
    onScrollLoadding();
  } catch (err) {
    console.log(err.message);
  }

  e.target.reset();
}

async function onloadMoreBtnClick() {
  showLoading(true);
  disableFormElements(true);
  try {
    const { hits, totalHits } = await pixabayAPI.fetchImages();
    console.log(galleryRef.childElementCount, totalHits);
    if (galleryRef.childElementCount >= totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
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
  }
  showLoading(false);
  disableFormElements(false);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

function onScrollLoadding() {
  const observerOptions = { rootMargin: '200px', treshold: 1.0 };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onloadMoreBtnClick();
      }
    });
  }, observerOptions);
  observer.observe(document.querySelector('.scroll-guard'));
}
function disableFormElements(status) {
  formRef.elements.submitBtn.disabled = status;
  formRef.elements.searchQuery.disabled = status;
}

function showLoading(status) {
  loadingAnimationRef.style.display = status ? 'block' : 'none';
}
