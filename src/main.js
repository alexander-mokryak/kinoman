import {render} from './framework/render.js';
import MainPresenter from './presenter/main-presenter';

import ProfileView from './view/profile-view';
import StatisticsView from './view/statistics-view';

import FilmsModel from './Module/FilmsModel';
import {getUserStatus} from './utils/user';

const filmsModel = new FilmsModel();

const headerElement = document.querySelector('.header');

render(new ProfileView(getUserStatus(filmsModel.get())), headerElement);

const mainElement = document.querySelector('.main');
const mainContent = new MainPresenter(mainElement, filmsModel.get());
mainContent.init();

const footerElement = document.querySelector('.footer__statistics');
render(new StatisticsView(), footerElement);

// TODO возможность переиспользования компонетов
// https://up.htmlacademy.ru/profession/react-lite/3/lite-javascript-2/2/module/5/item/2#


//Цепочка в одну сторону: Model.update вызывает Presenter.#modelEventHandler, который в свою очередь делегирует дочерним презентерам или напрямую указывает View обновиться.
// В обратную сторону: View.#какое-то_действие_Handler вызывает View.#changeData (внутреннее название Presenter.#viewActionHandler), который в свою очередь вызывает Model.update и всё идёт обратно:
