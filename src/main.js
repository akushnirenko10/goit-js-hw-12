import { checkPageCount, isQueryEmpty, showTost } from './js/helpers';
import { getImagesByQuery } from './js/pixabay-api';
import { refs } from './js/refs';
import {
  clearGallery,
  createGallery,
  getDoubleCardHeight,
  hideLoader,
  hideLoadMoreButton,
  scrollWindow,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

let page = 1;
let query = '';
let totalPages = 1;

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault();
  page = 1;

  query = event.currentTarget.elements['search-text'].value
    .trim()
    .toLowerCase();

  if (isQueryEmpty(query)) {
    event.target.reset();
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    totalPages = Math.ceil(totalHits / 15);

    if (hits.length === 0) {
      showTost(
        'Sorry, there are no images matching your search query. Please try again!',
        'info'
      );
      return;
    }

    checkPageCount(page, totalPages);
    createGallery(hits);
  } catch (err) {
    showTost(err.message, 'error');
  } finally {
    hideLoader();
    event.target.reset();
  }
}

async function onLoadMoreBtnClick() {
  hideLoadMoreButton();
  showLoader();
  page += 1;

  try {
    const { hits } = await getImagesByQuery(query, page);

    checkPageCount(page, totalPages);
    createGallery(hits);
    scrollWindow(getDoubleCardHeight());
  } catch (err) {
    showTost(err.message, 'error');
  } finally {
    hideLoader();
  }
}
