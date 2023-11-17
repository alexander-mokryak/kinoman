import {generateMovieData} from '../mock/data';

export default class MovieList {
  #list = Array.from({length: 16}, generateMovieData);

  get filmList () {
    return this.#list;
  }
}
