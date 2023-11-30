import {remove, render} from '../framework/render.js';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-card-container-view';
import ShowMoreView from '../view/show-more-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import ErrorMoviesView from '../view/error-movies-view';
import {generateFilter} from '../mock/filter.js';
import FilmPresenter from './film-presenter';
import {updateItem} from '../utils/utils';

const SHOW_FILMS_PER_STEP = 5;

export default class MainPresenter {
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #cardContainerComponent = new FilmsListContainerView();
  #errorComponent = new ErrorMoviesView();
  #showMoreButtonComponent = new ShowMoreView();
  #filmPresenter = new Map();

  #container = null;
  #filmList = null;
  #films = [];
  #currentFilmIndex = 0;


  constructor(container, films) {
    this.#container = container;
    this.#filmList = films;
  }


  init() {
    this.#films = [...this.#filmList.filmList];
    this.#renderBoard();
  }


  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };


  #renderBoard() {
    this.#renderFilters(this.#films, this.#container);
    this.#renderSort(this.#container);

    // блок с фильмами
    render(this.#filmsComponent, this.#container);
    // основной блок с фильмами
    render(this.#filmsListComponent, this.#filmsComponent.element);

    if (this.#films.length > 0) {
      render(this.#cardContainerComponent, this.#filmsListComponent.element);

      for (let i = 0; i < Math.min(SHOW_FILMS_PER_STEP, this.#films.length); i++) {
        this.#renderFilmCard(this.#films[i], this.#cardContainerComponent);
        this.#currentFilmIndex += 1;
      }
      if (this.#films.length > 5) {
        render(this.#showMoreButtonComponent, this.#filmsComponent.element);
      }

      this.#showMoreButtonComponent.setClickHandler(() => this.#handleShowMoreButtonClick());

    } else {
      render(this.#errorComponent, this.#filmsListComponent.element);
    }

    //extra блок с фильмами
    for (let i = 0; i < 2; i++) {
      render(new FilmsListExtraView(), this.#filmsComponent.element);
    }
  }


  #renderFilters(films, container) {
    const filterComponent = new FilterView(generateFilter(films));
    render(filterComponent, container);
  }


  #renderSort(container) {
    const sortComponent = new SortView();
    render(sortComponent, container);
  }


  #renderFilmCard(film, container) {
    const filmPresenter = new FilmPresenter(container, this.#filmChangeHandler);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }


  #clearFilmCards() {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#currentFilmIndex = 0;
    remove(this.#showMoreButtonComponent);
  }

  #handleShowMoreButtonClick = () => {
    this.#films
      .slice(this.#currentFilmIndex, this.#currentFilmIndex + SHOW_FILMS_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film, this.#cardContainerComponent));
    this.#currentFilmIndex += SHOW_FILMS_PER_STEP;

    if (this.#currentFilmIndex >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };
}
