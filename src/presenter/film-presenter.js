import {render} from '../framework/render.js';
import CardView from '../view/card-view';
import PopupView from '../view/popup-view';

export default class FilmPresenter {
  #container = null;
  #film = null;
  #FilmDetailsComponent = null;


  constructor(container) {
    this.#container = container;
  }


  init(film) {
    this.#film = film;
    const filmComponent = new CardView(this.#film);
    filmComponent.setClickHandler(() => this.#addFilmDetailsComponent(this.#film));
    render(filmComponent, this.#container.element);
  }


  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };


  #renderFilmDetails(film) {
    //TODO const comments = [...this.#commentList.element];
    this.#FilmDetailsComponent = new PopupView(film);

    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#FilmDetailsComponent.setClickHandler(() => this.#removeFilmDetailsComponent(this.#FilmDetailsComponent));

    render(this.#FilmDetailsComponent, this.#container.element);
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
}
