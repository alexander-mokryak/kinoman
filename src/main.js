import HeaderProfileView from './view/header-profile-view.js';
import FooterStatisticView from './view/footer-statistics-view.js';

import FilmsPresenter from './presenter/films-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

import {render} from './framework/render.js';
import {getUserStatus} from './utils/user.js';
import FilmsApiService from './api-services/films-api-service';
import CommentsApiService from './api-services/comments-api-service';

const AUTHORIZATION = 'Basic hS2sfS44wel1sa2j';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';

const bodyElement = document.querySelector('body');
const siteHeaderElement = bodyElement.querySelector('.header');
const siteMainElement = bodyElement.querySelector('.main');
const siteFooterElement = bodyElement.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filmsModel, filterModel);

const userStatus = getUserStatus(filmsModel.get());
const filmCount = filmsModel.get().length;

render(new HeaderProfileView(userStatus), siteHeaderElement);
render(new FooterStatisticView(filmCount), siteFooterStatisticsElement);

filterPresenter.init();
filmsPresenter.init();
filmsModel.init();
