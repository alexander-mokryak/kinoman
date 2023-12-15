import AbstractView from '../framework/view/abstract-view';
import {SORT_TYPE} from '../utils/const';

const createSortViewTemplate = (activeSortType) => `
  <ul class="sort">
    <li>
      <a href="#" class="sort__button ${activeSortType === SORT_TYPE.DEFAULT ? 'sort__button--active' : ''}" data-sort-type=${SORT_TYPE.DEFAULT}>Sort by default</a>
    </li>
    <li>
      <a href="#" class="sort__button ${activeSortType === SORT_TYPE.DATE ? 'sort__button--active' : ''}" data-sort-type=${SORT_TYPE.DATE}>Sort by date</a>
    </li>
    <li>
      <a href="#" class="sort__button ${activeSortType === SORT_TYPE.RATING ? 'sort__button--active' : ''}" data-sort-type=${SORT_TYPE.RATING}>Sort by rating</a>
    </li>
  </ul>`;

export default class SortView extends AbstractView {
  #activeSortType = 'default';

  constructor(activeSortType) {
    super();
    this.#activeSortType = activeSortType;
  }


  get template() {
    return createSortViewTemplate(this.#activeSortType);
  }


  setSortTypeClickHandler = (callback) => {
    // callback записывается во внутреннее свойство, иначе пришлось бы
    // работать с добавлением/удалением обработчика где-то снаружи
    this._callback.sortType = callback;
    // в addEventListener передаем абстрактный обработчик
    this.element.addEventListener('click', this.#sortTypeClickHandler);
  };


  #sortTypeClickHandler= (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    // внутри абстрактного обработчика вызовем callback
    this._callback.sortType(evt.target.dataset.sortType);
  };
}
