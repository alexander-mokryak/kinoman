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
    this.#FilmsComponent.setSortTypeChangeClickHandler(this.#handleSortTypeChange);
    render(this.#FilmsComponent, this.#container.element);
  }


  // TODO Одновременно может быть открыт только один попап. При открытии нового попапа прежний закрывается,
  //  например при клике на другую карточку при открытом попапе.
  //  Несохранённые изменения (неотправленный комментарий) пропадают.
  //  https://up.htmlacademy.ru/profession/react-lite/3/lite-javascript-2/2/homework-5-1
  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };


  #renderFilmDetails(film) {
    //TODO const comments = [...this.#commentList.element];
    this.#FilmDetailsComponent = new PopupView(film);

    this.#FilmDetailsComponent.setFilmDetailsSortTypeChangeClickHandler(this.#handleSortTypeChange);
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


  #handleSortTypeChange = (sortType) => {
    this.#changeData = ({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        [sortType]: !this.#film.userDetails[sortType]
      },
    });
  };


  destroy = () => {
    remove(this.#FilmsComponent);
  };
}
