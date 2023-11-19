import AbstractView from '../framework/view/abstract-view';

const createFilmsListViewTemplate = () => '<section class="films-list"><h2 class="films-list__title visually-hidden">All movies. Upcoming</h2></section>';

export default class FilmsListView extends  AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createFilmsListViewTemplate();
  }
}
