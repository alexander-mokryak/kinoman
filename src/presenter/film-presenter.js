import {render} from '../framework/render.js';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-card-container-view';
import CardView from '../view/card-view';
import ShowMoreView from '../view/show-more-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import PopupView from '../view/popup-view';
import ErrorMoviesView from '../view/error-movies-view';
import {generateFilter} from '../mock/filter.js';

const SHOW_FILMS_PER_STEP = 5;

export default class FilmPresenter {
  #sortComponent = new SortView();

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #cardContainerComponent = new FilmsListContainerView();
  #errorComponent = new ErrorMoviesView();

  #showMoreButtonComponent = new ShowMoreView();

  #container = null;
  #filmList = null;
  #films = [];

  #FilmDetailsComponent = null;
  #currentFilmIndex = 0;

  constructor(container, films) {
    this.#container = container;
    this.#filmList = films;
  }

  init() {
    this.#films = [...this.#filmList.filmList];
    this.#renderBoard();
  }


  #renderBoard() {
    const filterComponent = new FilterView(generateFilter(this.#films));
    render(filterComponent, this.#container);
    render(this.#sortComponent, this.#container);

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


  #renderFilmCard(film, container) {
    const filmCardComponent = new CardView(film);

    filmCardComponent.setClickHandler(() => this.#addFilmDetailsComponent(film));

    render(filmCardComponent, container.element);
  }


  #renderFilmDetails(film) {
    //TODO const comments = [...this.#commentList.element];
    this.#FilmDetailsComponent = new PopupView(film);

    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#FilmDetailsComponent.setClickHandler(() => this.#removeFilmDetailsComponent(this.#FilmDetailsComponent));

    render(this.#FilmDetailsComponent, this.#container);
  }


  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };


  #removeFilmDetailsComponent = () => {
    this.#FilmDetailsComponent.element.remove();
    document.body.classList.remove('hide-overflow');
  };


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      window.console.log('click');
      this.#FilmDetailsComponent.element.remove();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
