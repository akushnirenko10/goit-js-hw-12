import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
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
        return `<li class="gallery-item">
  <a class="gallery-item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" />
</a>
  <div class="gallery-text-wrapper">
    <p class="likes"><span>Likes</span> ${likes}</p>
    <p class="likes"><span>Views</span> ${views}</p>
    <p class="likes"><span>Comments</span> ${comments}</p>
    <p class="likes"><span>Downloads</span> ${downloads}</p>
  </div>
</li>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.add('visible');
}
export function hideLoader() {
  refs.loader.classList.remove('visible');
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.add('visible');
}
export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('visible');
}
