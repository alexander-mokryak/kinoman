import {getRandomInteger, correctFilmTime, getRandomFloat, convertSnakeToCamel} from '../utils/utils';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const movieId = () => nanoid();

const EMOTION = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const getRandomEmotion = () => {
  const randomIndex = getRandomInteger(0, EMOTION.length - 1);
  return(EMOTION[randomIndex]);
};

const Comments = [
  {
    'id': '1',
    'author': 'Ричард Гир',
    'comment': 'великолепный фильм, уже 100500 раз пересмотрел и все как в первый раз, OMG!',
    'date': dayjs('2019-05-11T16:12:32.554Z').format('YYYY/MM/DD'),
    'emotion': `${getRandomEmotion()}`,
  },
  {
    'id': '2',
    'author': 'Данила Козловский',
    'comment': 'Очень зашел фильм, глубокий как Байкал и такой же чистый и светлый. Обожаю этого режиссера.',
    'date': dayjs('2019-07-11T16:12:32.554Z').format('YYYY/MM/DD'),
    'emotion': `${getRandomEmotion()}`,
  },
  {
    'id': '2',
    'author': 'Сталин Иосиф',
    'comment': 'Отличный хоррор. Многое можно почерпнуть. Спасибо за советы',
    'date': dayjs('2021-04-17T13:12:32.554Z').format('YYYY/MM/DD'),
    'emotion': `${getRandomEmotion()}`,
  },
  {
    'id': '2',
    'author': 'Хейтер Хиппи Феминистка',
    'comment': 'Вообще ничего не люблю и нечего не нравится и поэтому и фильм ваш полное говно',
    'date': dayjs('2020-08-20T11:11:00.554Z').format('YYYY/MM/DD'),
    'emotion': `${getRandomEmotion()}`,
  }
];

const movieNameList = [
  'Тёмный рыцарь',
  'Криминальное чтиво',
  'Бойцовский клуб',
  'Форрест Гамп',
  'Начало',
  'Матрица',
  'Интерстеллар',
  'Зелёная миля',
  'Назад в будущее',
  'Унесённые призраками',
];

const generateFilmName = () => {
  const randomIndex = getRandomInteger(0, movieNameList.length -1);
  return movieNameList[randomIndex];
};

const getRandomPoster = () => {
  const randomIndex = getRandomInteger(0, 6);
  const POSTERS = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];
  return(POSTERS[randomIndex]);
};

const alreadyWatched = () => Boolean(getRandomInteger(0,1));

export const generateMovieData = () => ({
  'id': movieId(),
  'comments': [
    Comments[0], Comments[1], Comments[2], Comments[3]
  ],
  [`${convertSnakeToCamel('film_info')}`]: {
    'title': generateFilmName(),
    [`${convertSnakeToCamel('alternative_title')}`]: 'Laziness Who Sold Themselves',
    [`${convertSnakeToCamel('total_rating')}`]: getRandomFloat(0, 9),
    'poster': getRandomPoster() || '',
    [`${convertSnakeToCamel('age_rating')}`]: getRandomInteger(0, 18) || 0,
    'director': 'Tom Ford',
    'writers':
      [
        'Takeshi Kitano'
      ],
    'actors':
      [
        'Morgan Freeman'
      ],
    'release': {
      'date': dayjs('2019-05-11T00:00:00.000Z').format('DD MMMM YYYY'),
      'release_country': 'Finland'
    },
    'runtime': correctFilmTime('77'),
    'genre':
      [
        'Comedy'
      ],
    'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic \'Nu, Pogodi!\' and \'Alice in Wonderland\', with the best fight scenes since Bruce Lee.'
  },
  [`${convertSnakeToCamel('user_details')}`]: {
    'watchlist': Boolean(getRandomInteger(0,1)),
    alreadyWatched: alreadyWatched(),
    [`${convertSnakeToCamel('watching_date')}`]: alreadyWatched() ?  '2019-04-12T16:12:32.554Z' : null, //getWatchingDate add function
    'favorite': Boolean(getRandomInteger(0,1))
  }
});
