import {createElement} from '../render.js';

const createFilmsListContainerViewTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListContainerView {
  getTemplate() {
    return createFilmsListContainerViewTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
