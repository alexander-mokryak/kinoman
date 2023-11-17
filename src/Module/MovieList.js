import {generateMovieData} from '../mock/data';

export default class MovieList {
  #list = Array.from({length: 17}, generateMovieData);

  get filmList () {
    return this.#list;
  }
}
