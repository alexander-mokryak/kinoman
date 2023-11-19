import AbstractView from '../framework/view/abstract-view';

const createShowMoreViewTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreView extends AbstractView {
  constructor(props) {
    super(props);
  }

  get template() {
    return createShowMoreViewTemplate();
  }
}
