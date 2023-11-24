import {render} from './framework/render.js';
import FilmPresenter from './presenter/film-presenter';

import ProfileView from './view/profile-view';
import StatisticsView from './view/statistics-view';

import MovieList from './Module/MovieList';
import {getUserStatus} from './utils/user';

const movieList = new MovieList();

const headerElement = document.querySelector('.header');
render(new ProfileView(getUserStatus(movieList.filmList)), headerElement);

const mainElement = document.querySelector('.main');
const mainContent = new FilmPresenter(mainElement, movieList);
mainContent.init();

const footerElement = document.querySelector('.footer__statistics');
render(new StatisticsView(), footerElement);
