import { refs } from './refs';
import { getPixabayImages } from './render-functions';
import { createLoader } from './css-loader';
export function onFormSubmit(event) {
  event.preventDefault();
  createLoader();
  refs.gallery.innerHTML = '';
  const userInputValue = refs.formInput.value.trim();
  getPixabayImages(userInputValue);
  refs.form.reset();
}