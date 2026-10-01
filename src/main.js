import { getImagesByQuery } from './js/pixabay-api';
import { refs } from './js/refs';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let page = 1;
let query = '';

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault();
  clearGallery();

  const newQuery = event.currentTarget.elements['search-text'].value
    .trim()
    .toLowerCase();

  query = query !== newQuery ? newQuery : query;

  if (query === '') {
    return;
  }

  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    const totalPages = Math.ceil(totalHits / 15);

    if (page < totalPages) {
      showLoadMoreButton();
      page += 1;
    }

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
  } catch (err) {
    iziToast.error({
      message: err.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    event.target.reset();
  }
}

async function onLoadMoreBtnClick() {
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    const totalPages = Math.ceil(totalHits / 15);

    if (page < totalPages) {
      showLoadMoreButton();
      page += 1;
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    }

    createGallery(hits);
  } catch (err) {
    iziToast.error({
      message: err.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
