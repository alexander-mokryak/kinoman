import AbstractView from '../framework/view/abstract-view';

const createProfileViewTemplate = (status) => `<section class="header__profile profile"><p class="profile__rating">${status}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35"></section>`;

export default class ProfileView extends AbstractView {
  #userStatus;
  constructor(userStatus) {
    super();
    this.#userStatus = userStatus;
  }

  get template() {
    return createProfileViewTemplate(this.#userStatus);
  }
}
