import {generateMovieData} from '../mock/data';

export default class MovieList {
  list = Array.from({length: 5}, generateMovieData);
  getMovieList = () => this.list;
}
