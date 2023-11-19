import AbstractView from '../framework/view/abstract-view';

const createStatisticsViewTemplate = () => '<p>130 291 movies inside</p>';

export default class StatisticsView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createStatisticsViewTemplate();
  }
}
