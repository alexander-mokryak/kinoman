import {remove, render} from '../framework/render.js';
import CardView from '../view/card-view';
import PopupView from '../view/popup-view';

export default class FilmPresenter {
  #container = null;
  #film = null;
  #FilmsComponent = null;
  #FilmDetailsComponent = null;
  #changeData = null;


  constructor(container, changeData) {
    this.#container = container;
    this.#changeData = changeData;
  }


  init(film) {
    this.#film = film;
    this.#FilmsComponent = new CardView(this.#film);
    this.#FilmsComponent.setClickHandler(() => this.#addFilmDetailsComponent(this.#film));
    render(this.#FilmsComponent, this.#container.element);
  }


  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };


  #renderFilmDetails(film) {
    //TODO const comments = [...this.#commentList.element];
    this.#FilmDetailsComponent = new PopupView(film);

    this.#FilmDetailsComponent.setWatchListClickHandler(() => this.#addToWatchListClickHandler(this.#film));
    this.#FilmDetailsComponent.setAlreadyWatchedClickHandler(() => this.#addToAlreadyWatchClickHandler(this.#film));
    this.#FilmDetailsComponent.setFavoriteClickHandler(() => this.#addToFavoritesClickHandler(this.#film));
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#FilmDetailsComponent.setClickHandler(() => this.#removeFilmDetailsComponent(this.#FilmDetailsComponent));

    render(this.#FilmDetailsComponent, this.#container.element);
    window.console.log('film', film.userDetails);
  }


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#FilmDetailsComponent.element.remove();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };


  #removeFilmDetailsComponent = () => {
    this.#FilmDetailsComponent.element.remove();
    document.body.classList.remove('hide-overflow');
  };


  #addToWatchListClickHandler = () => {
    this.#changeData = ({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      },
    });
  };


  #addToAlreadyWatchClickHandler = () => {
    this.#changeData = ({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched
      },
    });
  };


  #addToFavoritesClickHandler = () => {
    this.#changeData = ({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite
      },
    });
  };


  destroy = () => {
    remove(this.#FilmsComponent);
  };
}
