import AbstractView from '../framework/view/abstract-view';

const createFilmsListContainerViewTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListContainerView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createFilmsListContainerViewTemplate();
  }
}
