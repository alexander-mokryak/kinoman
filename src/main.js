import {render} from './framework/render.js';
import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';

import ProfileView from './view/profile-view';
import StatisticsView from './view/statistics-view';

import FilmsModel from './Module/films-model';
import FilterModel from './Module/filter-model';
import {getUserStatus} from './utils/user';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(mainElement, filmsModel, filterModel);
const mainContent = new MainPresenter(mainElement, filmsModel, filterModel);

//header
render(new ProfileView(getUserStatus(filmsModel.get())), headerElement);
filterPresenter.init();
mainContent.init();

const footerElement = document.querySelector('.footer__statistics');
render(new StatisticsView(), footerElement);

// TODO возможность переиспользования компонетов
// https://up.htmlacademy.ru/profession/react-lite/3/lite-javascript-2/2/module/5/item/2#


//Цепочка в одну сторону: Model.update вызывает Presenter.#modelEventHandler, который в свою очередь делегирует дочерним презентерам или напрямую указывает View обновиться.
// В обратную сторону: View.#какое-то_действие_Handler вызывает View.#changeData (внутреннее название Presenter.#viewActionHandler), который в свою очередь вызывает Model.update и всё идёт обратно:
