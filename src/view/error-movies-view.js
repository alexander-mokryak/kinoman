import AbstractView from '../framework/view/abstract-view';

const createErrorMoviesViewTemplate = () => `
    <h2 class='films-list__title'>There are no movies in our database</h2
  >`;

export default class ErrorMoviesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createErrorMoviesViewTemplate();
  }
}

/* TODO Значение отображаемого текста зависит от выбранного фильтра:
*  All movies – 'There are no movies in our database'
*  Watchlist — 'There are no movies to watch now';
*  History — 'There are no watched movies now';
*  Favorites — 'There are no favorite movies now'.
*/
