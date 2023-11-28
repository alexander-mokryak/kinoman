import AbstractView from '../framework/view/abstract-view';

const createMenuViewTemplate = (films) => `
<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${films[1].count}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${films[2].count}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${films[3].count}</span></a>
</nav>
`;


export default class MenuView extends AbstractView {
  #films = [];
  /**
   [
     {name: 'all', count: 17}
     {name: 'watchlist', count: 8}
     {name: 'history', count: 7}
     {name: 'favorites', count: 6}
   ]
   */

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createMenuViewTemplate(this.#films);
  }
}
