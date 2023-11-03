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

  init(container, movieList) {
    this.container = container;
    this.movieList = movieList;
    this.movies = this.movieList.getMovieList();

    render(this.menuComponent, this.container);
    render(this.sortComponent, this.container);
    // блок с фильмами
    render(this.filmsComponent, this.container);
    // основной блок с фильмами
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.cardContainerComponent, this.filmsListComponent.getElement());

    for (const movie of this.movies) {
      render(new CardView(movie), this.cardContainerComponent.getElement());
    }

    render(this.showMoreComponent, this.filmsComponent.getElement());

    //extra блок с фильмами
    for (let i = 0; i < 2; i++) {
      render(new FilmsListExtraView(), this.filmsComponent.getElement());
    }

    // popup
    render(new PopupView(this.movies[1]), this.container);
  }
}
