import AbstractView from '../framework/view/abstract-view';

const createCardViewTemplate = ({title, totalRating, poster}) =>
  `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster"/>
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <span class="film-card__comments">5 comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;

export default class CardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
    this.filmInfo = this.#movie.filmInfo;
  }

  get template() {
    return createCardViewTemplate(this.filmInfo);
  }

  setClickHandler = (callback) => {
    // callback записывается во внутреннее свойство, иначе пришлось бы
    // работать с добавлением/удалением обработчика где-то снаружи
    this._callback.click = callback;
    // в addEventListener передаем абстрактный обработчик
    this.element.querySelector('a').addEventListener('click', this.#clickHandler);
  };

  #clickHandler= (evt) => {
    evt.preventDefault();
    // внутри абстрактного обработчика вызовем callback
    this._callback.click();
  };
}
