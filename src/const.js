const EMOTION_DATA = {
  'smile': {
    'url': './images/emoji/smile.png',
    'alt': 'emoji-smile'
  },
  'sleeping': {
    'url': './images/emoji/sleeping.png',
    'alt': 'emoji-sleeping'
  },
  'puke': {
    'url': './images/emoji/puke.png',
    'alt': 'emoji-puke'
  },
  'angry': {
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

export {EMOTION_DATA, USER_STATUS, FilterType, SORT_TYPE};
