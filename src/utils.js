export const returnTrueOrFalse = () => Math.round(Math.random()) === 1;

export const getRandomElementOfArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const formatDate = (milliseconds, options) => new Date(milliseconds).toLocaleString(`en-US`, options);
