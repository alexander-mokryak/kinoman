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
  menuComponent = new MenuView();
  sortComponent = new SortView();
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  cardContainerComponent = new FilmsListContainerView();
  showMoreComponent = new ShowMoreView();
  popupComponent = new PopupView();

  init(container) {
    this.container = container;

    render(this.menuComponent, this.container);
    render(this.sortComponent, this.container);
    // блок с фильмами
    render(this.filmsComponent, this.container);
    // основной блок с фильмами
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.cardContainerComponent, this.filmsListComponent.getElement());
    for (let i = 0; i < 5; i++) {
      render(new CardView(), this.cardContainerComponent.getElement());
    }

    render(this.showMoreComponent, this.filmsComponent.getElement());

    //extra блок с фильмами
    for (let i = 0; i < 2; i++) {
      render(new FilmsListExtraView(), this.filmsComponent.getElement());
    }

    // popup
    render(this.popupComponent, this.container);
  }
}
