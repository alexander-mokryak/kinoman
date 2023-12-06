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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const sortFilmsByDate = (filmA, filmB) => new Date(filmB.filmInfo.release.date) - new Date(filmA.filmInfo.release.date);

const sortFilmsByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {
  getRandomInteger,
  getRandomFloat,
  generateRandomId,
  correctFilmTime,
  convertSnakeToCamel,
  updateItem,
  sortFilmsByDate,
  sortFilmsByRating,
};


