import {remove, render, replace} from '../framework/render.js';
import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-card-container-view';
import ShowMoreView from '../view/show-more-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import ErrorMoviesView from '../view/error-movies-view';
import FilmPresenter from './film-presenter';
import {sortFilmsByDate, sortFilmsByRating} from '../utils/utils';
import {SORT_TYPE} from '../utils/const';
import {filter} from '../utils/filter';
import {userAction, updateType} from '../utils/const';

const SHOW_FILMS_PER_STEP = 5;

export default class MainPresenter {
  #filmsModel = null;
  #filterModel = null;
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

  constructor(container, filmsModel, filterModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get films () {
    const filterType = this.#filterModel.get();
    const films = this.#filmsModel.get();

    const filteredFilms = filter[filterType](films);

    switch (this.#currentSortType) {
      case  SORT_TYPE.DATE:
        return filteredFilms.sort(sortFilmsByDate);
      case SORT_TYPE.RATING:
        return filteredFilms.sort(sortFilmsByRating);
    }
    return filteredFilms;
  }

  init() {
    this.#renderBoard();
  }

  #viewActionHandler = (actionType, UpdateType, updateFilm) => {//, updateComment
    switch (actionType) {
      case userAction.UPDATE_FILM:
        this.#filmsModel.update(updateType, updateFilm);
        break;
      // case userAction.ADD_COMMENT:
      //   this.#commentsModel.add(updateType, updateComment);
      //   this.#filmDetailsPresenter.clearViewData();
      //   this.#filmsModel.update(updateType, updateFilm);
      //   break;
      // case userAction.DELETE_COMMENT:
      //   this.#commentsModel.delete(updateType, updateComment);
      //   this.#filmsModel.update(updateType, updateFilm);
      //   break;
    }
  };

  #modelEventHandler = (UpdateType, data) => {
    switch (UpdateType) {
      case updateType.PATCH:
        // if (this.#filmPresenter.get(data.id)) {
        //   this.#filmPresenter.get(data.id).init(data);
        // }
      //   if (this.#filmDetailsPresenter && this.#selectedFilm.id === data.id) {
      //     this.#selectedFilm = data;
      //     this.#renderFilmDetails();
      //   }
      //   if (this.#filterModel.get() !== FilterType.ALL) {
      //     this.#modelEventHandler(UpdateType.MINOR);
      //   }
        break;
      case updateType.MINOR:
      //   this.#clearFilmBoard();
      //   this.#renderFilmBoard();
        break;
      case updateType.MAJOR:
        this.#clearFilmBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderFilms();
        break;
    }
  };

  #filmChangeHandler = (updatedFilm) => {
    if (this.#filmsPresenter.get(updatedFilm.id)) {
      this.#filmsPresenter.get(updatedFilm.id).init(updatedFilm);
    }
  };

  #renderBoard() {
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
    const filmPresenter = new FilmPresenter(container, this.#viewActionHandler, this.#filmChangeHandler);
    filmPresenter.init(film);
    this.#filmsPresenter.set(film.id, filmPresenter);
  }

  #clearFilmBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    this.#filmsPresenter.forEach((presenter) => presenter.destroy());
    this.#filmsPresenter.clear();

    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this.#currentFilmIndex = 0;
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DEFAULT;
    }
  };

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
