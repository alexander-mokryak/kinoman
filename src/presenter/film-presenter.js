import {render} from '../render';

import MenuView from '../view/menu-view';
import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-card-container-view';
import CardView from '../view/card-view';
import ShowMoreView from '../view/show-more-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import PopupView from '../view/popup-view';

export default class FilmPresenter {
  #menuComponent = new MenuView();
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #cardContainerComponent = new FilmsListContainerView();
  #showMoreComponent = new ShowMoreView();

  #container = null;
  #movieList = null;
  #movies = [];

  init(container, movieList) {
    this.#container = container;
    this.#movieList = movieList;
    this.#movies = [...this.#movieList.movieList];

    render(this.#menuComponent, this.#container);
    render(this.#sortComponent, this.#container);
    // блок с фильмами
    render(this.#filmsComponent, this.#container);
    // основной блок с фильмами
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#cardContainerComponent, this.#filmsListComponent.element);

    for (const movie of this.#movies) {
      render(new CardView(movie), this.#cardContainerComponent.element);
    }

    render(this.#showMoreComponent, this.#filmsComponent.element);

    //extra блок с фильмами
    for (let i = 0; i < 2; i++) {
      render(new FilmsListExtraView(), this.#filmsComponent.element);
    }

    // popup
    render(new PopupView(this.#movies[1]), this.#container);
  }
}
