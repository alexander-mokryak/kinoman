const EMOTION_DATA = {
  'smile': {
    'name': 'smile',
    'url': './images/emoji/smile.png',
    'alt': 'emoji-smile'
  },
  'sleeping': {
    'name': 'sleeping',
    'url': './images/emoji/sleeping.png',
    'alt': 'emoji-sleeping'
  },
  'puke': {
    'name': 'puke',
    'url': './images/emoji/puke.png',
    'alt': 'emoji-puke'
  },
  'angry': {
    'name': 'angry',
    'url': './images/emoji/angry.png',
    'alt': 'emoji-angry'
  },
};

const USER_STATUS = {
  NOVICE: 1,
  FAN: 11,
  MOVIE_BUFF: 21,
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'alreadyWatched',
  FAVORITES: 'favorite'
};

const SORT_TYPE = {
  DEFAULT: 'default',
  DATE: 'data',
  RATING: 'rating',
};

const userAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const updateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',//
  MAJOR: 'MAJOR'//
};

export {EMOTION_DATA, USER_STATUS, FilterType, SORT_TYPE, userAction, updateType};
