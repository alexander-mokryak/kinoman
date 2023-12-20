import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #apiService = null;
  #comments = [];
  #allComments = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get = async (film) => {
    this.#comments = await this.#apiService.get(film);
    return this.#comments;
  };

  add = (updateType, update) => {
    this.#allComments.push(update);
    this._notify(updateType, update);
  };

  delete = (updateType, update) => {
    const index = this.#allComments.findIndex(
      (comment) => comment.id === update.id
    );

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#allComments = [
      ...this.#allComments.slice(0, index),
      ...this.#allComments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
