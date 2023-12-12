import {EMOTION_DATA, FilterType} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createComments = (comments, checkedEmotion) => {

  const list = comments.map((comment) => (
    `<li className="film-details__comment">
       <span className="film-details__comment-emoji">
         <img src=${EMOTION_DATA[comment.emotion].url} width="55" height="55" alt=${EMOTION_DATA[comment.emotion].alt}>
       </span>

      <div>
        <p className="film-details__comment-text">${comment.comment}</p>
        <p className="film-details__comment-info">
          <span className="film-details__comment-author">${comment.author}</span>
          <span className="film-details__comment-day">${comment.date}</span>
          <button className="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  )).join('');

  return (`
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <!-- comments -->
          <ul class="film-details__comments-list">${list}</ul>

          <!-- new comment -->
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${checkedEmotion ? `<img src="./images/emoji/${checkedEmotion}.png" width="30" height="30" alt="emoji">` : ''}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile" data-emotion-type="${EMOTION_DATA.smile.name}">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping" data-emotion-type="${EMOTION_DATA.sleeping.name}">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke" data-emotion-type="${EMOTION_DATA.puke.name}">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry" data-emotion-type="${EMOTION_DATA.angry.name}">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>`
  );
};

const createPopupTemplate = (filmState) => `
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${filmState.poster} alt="">

            <p class="film-details__age">${filmState.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmState.title}</h3>
                <p class="film-details__title-original">${filmState.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmState.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmState.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmState.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmState.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmState.release.date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmState.runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                <b style="color: red">${filmState.genre} TODO sort Array</b>
                  <span class="film-details__genre">Drama</span>
                  <span class="film-details__genre">Film-Noir</span>
                  <span class="film-details__genre">Mystery</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">${filmState.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${filmState.userDetails.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist" data-sort-type=${FilterType.WATCHLIST}>Add to watchlist</button>
          <button type="button" class="film-details__control-button ${filmState.userDetails.alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched" data-sort-type=${FilterType.HISTORY}>Already watched</button>
          <button type="button" class="film-details__control-button ${filmState.userDetails.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite" data-sort-type=${FilterType.FAVORITES}>Add to favorites</button>
        </section>
      </div>

     ${createComments(filmState.comments, filmState.checkedEmotion)}
    </form>
  </section>
`;

export default class PopupView extends AbstractStatefulView {
  constructor(movie) {
    super();
    this._state = PopupView.parseFilmToState(movie.filmInfo, movie.comments, movie.userDetails);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.setScrollPosition();
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setSortTypeChangeClickHandler( this._callback.sortTypeChangeClick);
    // this.setFormSubmitHandlers(this._callback.formSubmit); TODO
  };

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close').addEventListener('click', this.#closeButtonClickHandler);
  };

  #closeButtonClickHandler= (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  setSortTypeChangeClickHandler = (callback) => {
    this._callback.sortTypeChangeClick = callback;
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#sortTypeChangeClickHandler);
  };

  #sortTypeChangeClickHandler= (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    evt.preventDefault();
    // внутри абстрактного обработчика вызовем callback
    this._callback.sortTypeChangeClick(evt.target.dataset.sortType);
    this.element.querySelector(`.film-details__controls button[data-sort-type = ${evt.target.dataset.sortType}]`).classList.toggle('film-details__control-button--active');
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };

  #setInnerHandlers = () => {
    this.element
      .querySelectorAll('.film-details__emoji-label')
      .forEach((el) => {
        el.addEventListener('click', this.#emotionClickHandler);
      });
    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputChangeHandler);
  };

  #emotionClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedEmotion: evt.currentTarget.dataset.emotionType,
      scrollPosition: this.element.scrollTop
    });
    this.element.querySelector(`.film-details__emoji-item[value=${evt.currentTarget.dataset.emotionType}]` ).checked = true;
    //TODO добавить в состояние?
    // window.console.log(this.element.querySelector(`.film-details__emoji-item[value=${evt.currentTarget.dataset.emotionType}]`));

  };

  #commentInputChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({comment: evt.target.value});
  };

  static parseFilmToState = (
    film,
    comments,
    userDetails,
    checkedEmotion = null,
    comment = null,
    scrollPosition = 0
  ) => ({
    ...film,
    comments,
    userDetails,
    checkedEmotion,
    comment,
    scrollPosition
  });

  setFormSubmitHandlers (callback) {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandlers);
  }

  #formSubmitHandlers (evt) {
    evt.preventDefault();
    this._callback.formSubmit(PopupView.parseFilmToState(this._state));
  }
}
