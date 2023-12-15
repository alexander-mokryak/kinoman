import {remove, render, replace} from '../framework/render.js';
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
import {sortFilmsByDate, sortFilmsByRating} from '../utils/utils';
import {SORT_TYPE} from '../utils/const';

const SHOW_FILMS_PER_STEP = 5;

export default class MainPresenter {
  #filmsModel = null;
  #currentSortType = SORT_TYPE.DEFAULT;
  #sortComponent = null;
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #cardContainerComponent = new FilmsListContainerView();
  #errorComponent = new ErrorMoviesView();
  #showMoreButtonComponent = new ShowMoreView();
  #filmsPresenter = new Map();

  #container = null;

  #currentFilmIndex = 0;

  constructor(container, films) {
    this.#container = container;
    this.#filmsModel = films;
  }

  get films () {
    switch (this.#currentSortType) {
      case  SORT_TYPE.DATE:
        return [...this.#filmsModel].sort(sortFilmsByDate);
      case SORT_TYPE.RATING:
        return [...this.#filmsModel].sort(sortFilmsByRating);
    }
    return this.#filmsModel;
  }

  init() {
    this.#renderBoard();
  }

  #filmChangeHandler = (updatedFilm) => {
    if (this.#filmsPresenter.get(updatedFilm.id)) {
      this.#filmsPresenter.get(updatedFilm.id).init(updatedFilm);
    }
  };

  #renderBoard() {
    this.#renderFilters(this.films, this.#container);
    this.#renderSort(this.#container);

    // блок .films
    render(this.#filmsComponent, this.#container);
    // блок .films-list
    render(this.#filmsListComponent, this.#filmsComponent.element);

    this.#renderFilms();

    //extra блок с фильмами
    for (let i = 0; i < 2; i++) {
      render(new FilmsListExtraView(), this.#filmsComponent.element);
    }
  }

  #renderFilters(films, container) {
    const filterComponent = new FilterView(generateFilter(films));
    render(filterComponent, container);
  }

  #sortFilms = (SortType) => {
    switch (SortType) {
      case SORT_TYPE.DATE:
        this.films.sort(sortFilmsByDate);
        break;
      case SORT_TYPE.RATING:
        this.films.sort(sortFilmsByRating);
        break;
      default:
        return this.films;
    }
    this.#currentSortType = SortType;
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortFilms(sortType); //sortType - callback of sortTypeChangeHandler()
    this.#clearFilmCards();
    this.#renderSort(this.#container);
    this.#renderFilms();
  };

  #renderSort(container) {
    if (!this.#sortComponent) {
      this.#sortComponent = new SortView(this.#currentSortType);
      render(this.#sortComponent, container);
    } else {
      const updatedSortComponent = new SortView(this.#currentSortType);
      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }

    this.#sortComponent.setSortTypeClickHandler(this.#sortTypeChangeHandler);
  }

  #renderFilms() {
    if (this.films.length > 0) {
      render(this.#cardContainerComponent, this.#filmsListComponent.element);

      for (let i = 0; i < Math.min(SHOW_FILMS_PER_STEP, this.films.length); i++) {
        this.#renderFilmCard(this.films[i], this.#cardContainerComponent);
        this.#currentFilmIndex += 1;
      }
      if (this.films.length > 5) {
        render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
      }

      this.#showMoreButtonComponent.setClickHandler(() => this.#handleShowMoreButtonClick());

    } else {
      render(this.#errorComponent, this.#filmsListComponent.element);
    }
  }

  #renderFilmCard(film, container) {
    const filmPresenter = new FilmPresenter(container, this.#filmChangeHandler);
    filmPresenter.init(film);
    this.#filmsPresenter.set(film.id, filmPresenter);
  }

  #clearFilmCards() {
    this.#filmsPresenter.forEach((presenter) => presenter.destroy());
    this.#filmsPresenter.clear();
    this.#currentFilmIndex = 0;
    remove(this.#showMoreButtonComponent);
  }

  #handleShowMoreButtonClick = () => {
    this.films
      .slice(this.#currentFilmIndex, this.#currentFilmIndex + SHOW_FILMS_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film, this.#cardContainerComponent));
    this.#currentFilmIndex += SHOW_FILMS_PER_STEP;

    if (this.#currentFilmIndex >= this.films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };
}
