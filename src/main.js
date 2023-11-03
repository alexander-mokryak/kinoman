import {render} from './render';
import FilmPresenter from './presenter/film-presenter';

import ProfileView from './view/profile-view';
import StatisticsView from './view/statistics-view';

import MovieList from './Module/MovieList';

const movieList = new MovieList();

const headerElement = document.querySelector('.header');
render(new ProfileView(), headerElement);

const mainElement = document.querySelector('.main');
const mainContent = new FilmPresenter();
mainContent.init(mainElement, movieList);

const footerElement = document.querySelector('.footer__statistics');
render(new StatisticsView(), footerElement);
