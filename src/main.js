import {render} from './framework/render.js';
import MainPresenter from './presenter/main-presenter';

import ProfileView from './view/profile-view';
import StatisticsView from './view/statistics-view';

import MovieList from './Module/MovieList';
import {getUserStatus} from './utils/user';

const movieList = new MovieList();

const headerElement = document.querySelector('.header');
render(new ProfileView(getUserStatus(movieList.filmList)), headerElement);

const mainElement = document.querySelector('.main');
const mainContent = new MainPresenter(mainElement, movieList);
mainContent.init();

const footerElement = document.querySelector('.footer__statistics');
render(new StatisticsView(), footerElement);

// TODO возможность переиспользования компонетов
// https://up.htmlacademy.ru/profession/react-lite/3/lite-javascript-2/2/module/5/item/2#
