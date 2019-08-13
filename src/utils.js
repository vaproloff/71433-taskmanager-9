export const returnTrueOrFalse = (probability = 1) => Boolean(Math.round(Math.random() * probability));

export const getRandomElementOfArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const formatDate = (milliseconds, options) => new Date(milliseconds).toLocaleString(`en-US`, options);
