import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';
import { removeLoader } from './css-loader';
export function getPixabayImages(inputValue) {
  if (inputValue === '') {
    removeLoader();
    return iziToast.error({
      message: 'Form field must be filled in',
      position: 'topRight',
    });
  }
  const BASE_URL = 'https://pixabay.com/api/';
  const PIXABAY_KEY = '?key=42450434-3c949e4f0cfd845cc919e9207';
  const PARAMS = `&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`;
  const url = BASE_URL + PIXABAY_KEY + PARAMS;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        const markup = data.hits
          .map(data => {
            return `<li class="gallery-item">
          <a href="${data.largeImageURL}">
          <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
          <div class="text">
          <p><b>Likes </b>${data.likes}</p>
          <p><b>Views </b>${data.views}</p>
          <p><b>Comments </b>${data.comments}</p>
          <p><b>Downloads </b>${data.downloads}</p>
          </div>
          </li>`;
          })
          .join('');
        refs.gallery.insertAdjacentHTML('afterbegin', markup);
        const gallery = new SimpleLightbox('.gallery a', modalOptions);
        gallery.refresh();
      }
    })
    .catch(error => console.log('Error:', error))
    .finally(() => {
      removeLoader();
    });
}

const modalOptions = {
  captionsData: 'alt',
  captionDelay: 250,
};