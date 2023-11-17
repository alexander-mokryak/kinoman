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

const SHOW_FILMS_PER_STEP = 5;

export default class FilmPresenter {
  #menuComponent = new MenuView();
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #cardContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreView();

  #container = null;
  #filmList = null;
  #films = [];

  #FilmDetailsComponent = null;
  #currentFilmIndex = 0;

  init(container, films) {
    this.#container = container;
    this.#filmList = films;
    this.#films = [...this.#filmList.filmList];

    render(this.#menuComponent, this.#container);
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
      render(this.#showMoreButtonComponent, this.#filmsComponent.element);

      this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
    } else {
      const title = this.#filmsListComponent.element.querySelector('.films-list__title');
      title.classList.remove('visually-hidden');
      title.innerHTML = 'There are no movies in our database';
      //  TODO
      /* Значение отображаемого текста зависит от выбранного фильтра:
      *  All movies – 'There are no movies in our database'
      *  Watchlist — 'There are no movies to watch now';
      *  History — 'There are no watched movies now';
      *  Favorites — 'There are no favorite movies now'
       */
    }

    //extra блок с фильмами
    for (let i = 0; i < 2; i++) {
      render(new FilmsListExtraView(), this.#filmsComponent.element);
    }
  }


  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
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
    const linkFilmCardComponent = filmCardComponent.element.querySelector('a');

    linkFilmCardComponent.addEventListener('click', () => {
      this.#addFilmDetailsComponent(film);
    });

    render(filmCardComponent, container.element);
  }


  #renderFilmDetails(film) {
    //TODO const comments = [...this.#commentList.element];
    this.#FilmDetailsComponent = new PopupView(film);
    const closeButtonFilmDetailsComponent = this.#FilmDetailsComponent.element.querySelector('.film-details__close');

    document.addEventListener('keydown', this.#onEscKeyDown);

    closeButtonFilmDetailsComponent.addEventListener('click', () => {
      this.#removeFilmDetailsComponent(this.#FilmDetailsComponent);
    });

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
