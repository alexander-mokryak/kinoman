import {createElement} from '../render.js';

const createFilmsListContainerViewTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListContainerView {
  #element = null;

  get template() {
    return createFilmsListContainerViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
