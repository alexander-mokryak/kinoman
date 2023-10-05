import {createElement} from '../render.js';

const createShowMoreViewTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreView {
  getTemplate() {
    return createShowMoreViewTemplate();
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
