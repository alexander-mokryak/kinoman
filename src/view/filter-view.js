import AbstractView from '../framework/view/abstract-view';

const createFilterViewItem = (film) => {
  const {name, count} = film;
  if (name === 'all') {
    return '<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>';
  }

  return `
    <a
      href="#${name}"
      class="main-navigation__item"
    >
      ${name.slice(0, 1).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span>
    </a>
  `;
};


const createFilterViewTemplate = (films) => {
  const filterItems = films.map(  (film) => createFilterViewItem(film) ).join('') ;

  return `<nav class="main-navigation">${filterItems}</nav>`;
};


export default class FilterView extends AbstractView {
  #films = [];

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFilterViewTemplate(this.#films);
  }
}
