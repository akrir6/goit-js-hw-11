import './../css/styles.css';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { setInfiniteScroll } from './infiniteScroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './pixabayAPI';
import { galleryRef, renderGallery, clearGalleryMarkup } from './galleryMarkup';

Notify.init({ cssAnimationStyle: 'from-right' });

const formRef = document.querySelector('.search-form');
formRef.addEventListener('submit', onFormSubmit);

const pixabayAPI = new PixabayAPI();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

async function onFormSubmit(e) {
  e.preventDefault();

  pixabayAPI.searchQuery = e.target.elements.searchQuery.value.trim();
  if (!pixabayAPI.searchQuery) return Notify.info('Input some to search');

  clearGalleryMarkup();
  pixabayAPI.resetPage();
  loadImages();
  e.target.reset();
  setInfiniteScroll(loadImages);
}

async function loadImages() {
  onStartLoadingImages();

  try {
    const { hits, totalHits } = await pixabayAPI.fetchImages();
    if (!totalHits) {
      onFinishLoadingImages();
      formRef.reset();
      return Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (pixabayAPI.page === 1) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    if (galleryRef.childElementCount >= totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    renderGallery(hits);
    lightbox.refresh();
  } catch (err) {
    console.log(err.message);
  }

  onFinishLoadingImages();
}

function onStartLoadingImages() {
  Loading.dots();
  formRef.elements.submitBtn.disabled = true;
  formRef.elements.searchQuery.disabled = true;
}

function onFinishLoadingImages() {
  Loading.remove();
  formRef.elements.submitBtn.disabled = false;
  formRef.elements.searchQuery.disabled = false;
}
