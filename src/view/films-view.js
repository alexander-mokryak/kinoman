import AbstractView from '../framework/view/abstract-view';

const createFilmsViewTemplate = () => '<section class="films"></section>';

export default class FilmsView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createFilmsViewTemplate();
  }
}
