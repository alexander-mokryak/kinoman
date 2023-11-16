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

  #FilmDetailsComponent = null;

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
      this.#renderFilmCard(movie, this.#cardContainerComponent);
    }

    render(this.#showMoreComponent, this.#filmsComponent.element);

    //extra блок с фильмами
    for (let i = 0; i < 2; i++) {
      render(new FilmsListExtraView(), this.#filmsComponent.element);
    }
  }


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
