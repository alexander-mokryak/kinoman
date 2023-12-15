import {USER_STATUS} from './const';

const getUserStatus = (films) => {

  const watchedFilmCount = films.filter((film) => film.userDetails.alreadyWatched).length;

  if (watchedFilmCount >= USER_STATUS.NOVICE && watchedFilmCount < USER_STATUS.FAN) {
    return 'novice';
  }

  if (watchedFilmCount >= USER_STATUS.FAN && watchedFilmCount < USER_STATUS.MOVIE_BUFF) {
    return 'fan';
  }

  if (watchedFilmCount >= USER_STATUS.MOVIE_BUFF ) {
    return 'movie buff';
  }

  return null;
};

export {getUserStatus};
