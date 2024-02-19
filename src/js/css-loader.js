import { refs } from './refs';
export function createLoader() {
  refs.cssLoader.classList.add('loader');
}

export function removeLoader() {
  refs.cssLoader.classList.remove('loader');
}