import './sass/main.scss';

import refs from './js/refs';
import ImgApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import imgTemplate from './templates/img_card';

const { galleryEl, searchFormEl } = refs;

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imgApiService = new ImgApiService();

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(e) {
  e.preventDefault();
  imgApiService.query = e.currentTarget.elements.query.value;
  if (imgApiService.query === '') {
    return alert('What ???');
  }

  loadMoreBtn.show();
  imgApiService.resetPage();
  clearGallery();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();
  imgApiService.fetchImg().then(images => {
    createGalleryMarkup(images);
    scrollByClick();
    loadMoreBtn.enable();
  });
}

function createGalleryMarkup(img) {
  return galleryEl.insertAdjacentHTML('beforeend', imgTemplate(img));
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

function scrollByClick() {
  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
