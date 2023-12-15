import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Get a random floating point number
function getRandomFloat(min, max, dotPosition = 1) {
  return (Math.random() * (max - min) + min).toFixed(dotPosition);
}

const generateRandomId = (min, max) => {
  const usedId = [];

  return function () {
    let currentId;

    if (usedId.length === max) {
      window.console.log('ID generation limit exceeded');
      return;
    }

    if (usedId.length === 0) {
      currentId = getRandomInteger(min, max);
      usedId.push(currentId);
      return currentId;
    }

    do {
      currentId = getRandomInteger(min, max);
    } while (usedId.indexOf(currentId) !== -1);//true

    usedId.push(currentId);
    return currentId;
  };
};

const correctFilmTime = (data) => {
  let hour;
  let resultTime;
  const time = Number(data);

  if (time === 0) {
    return '';
  }

  if (time <= 60) {
    resultTime = `${time}m`;
    return resultTime;

  } else {
    hour = Math.floor(time / 60);
    const minutes = time - (60 * hour);

    if (hour && hour > 0) {
      resultTime = `${hour}h `;
    }

    if (minutes && minutes > 0) {
      resultTime += `${minutes}m`;
    }
    return resultTime;
  }
};

const convertSnakeToCamel = (snake) =>
  snake.toLowerCase().replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

//TODO проверь когда данные подойдут https://up.htmlacademy.ru/profession/react-lite/3/lite-javascript-2/2/homework-6-2
const humanizeDate = (date) => {
  const timeDiff = dayjs(date).diff(dayjs());
  return dayjs.duration(timeDiff).humanize(true);
};

const formatStringToDate = (date) => dayjs(date).format('DD MMMM YYYY');

const formatStringToYear = (date) => dayjs(date).format('YYYY');

const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

const sortFilmsByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

const sortFilmsByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {
  getRandomInteger,
  getRandomFloat,
  generateRandomId,
  correctFilmTime,
  convertSnakeToCamel,
  humanizeDate,
  formatStringToDate,
  formatStringToYear,
  formatMinutesToTime,
  sortFilmsByDate,
  sortFilmsByRating,
};


