import AbstractView from '../framework/view/abstract-view';

const createShowMoreViewTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreView extends AbstractView {
  constructor(props) {
    super(props);
  }

  get template() {
    return createShowMoreViewTemplate();
  }

  setClickHandler = (callback) => {
    // callback записывается во внутреннее свойство, иначе пришлось бы
    // работать с добавлением/удалением обработчика где-то снаружи
    this._callback.click = callback;
    // в addEventListener передаем абстрактный обработчик
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler= (evt) => {
    evt.preventDefault();
    // внутри абстрактного обработчика вызовем callback
    this._callback.click();
  };
}
