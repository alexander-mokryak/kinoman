import AbstractView from '../framework/view/abstract-view';
import {EMOTION_DATA, FilterType} from '../const.js';

const createComments = (comments) => {

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
  ));

  return (`
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <!-- comments -->
          <ul class="film-details__comments-list">${list}</ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>`
  );
};

const createPopupTemplate = ({comments, filmInfo}) => `
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${filmInfo.poster} alt="">

            <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmInfo.release.date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmInfo.runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                <b style="color: red">${filmInfo.genre} TODO sort Array</b>
                  <span class="film-details__genre">Drama</span>
                  <span class="film-details__genre">Film-Noir</span>
                  <span class="film-details__genre">Mystery</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist" data-sort-type=${FilterType.WATCHLIST}>Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched" data-sort-type=${FilterType.HISTORY}>Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite" data-sort-type=${FilterType.FAVORITES}>Add to favorites</button>
        </section>
      </div>

     ${createComments(comments)}
    </form>
  </section>
`;

export default class PopupView extends AbstractView {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  get template() {
    return createPopupTemplate(this.movie);
  }

  setClickHandler = (callback) => {
    // callback записывается во внутреннее свойство, иначе пришлось бы
    // работать с добавлением/удалением обработчика где-то снаружи
    this._callback.click = callback;
    // в addEventListener передаем абстрактный обработчик
    this.element.querySelector('.film-details__close').addEventListener('click', this.#clickHandler);
  };


  #clickHandler= (evt) => {
    evt.preventDefault();
    // внутри абстрактного обработчика вызовем callback
    this._callback.click();
  };


  setFilmDetailsSortTypeChangeClickHandler = (callback) => {
    // callback записывается во внутреннее свойство, иначе пришлось бы
    // работать с добавлением/удалением обработчика где-то снаружи
    this._callback.filmDetailsSortTypeChange = callback;
    // в addEventListener передаем абстрактный обработчик
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#filmDetailsSortTypeChangeClickHandler);
  };

  #filmDetailsSortTypeChangeClickHandler= (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    evt.preventDefault();
    // внутри абстрактного обработчика вызовем callback
    this._callback.filmDetailsSortTypeChange(evt.target.dataset.sortType);
  };
}
