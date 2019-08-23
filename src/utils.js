export const DateOption = {
  NUMERIC_DAY: [`en-US`, {day: `numeric`}],
  FULL_MONTH: [`en-US`, {month: `long`}],
  SHORT_TIME: [`en-US`, {hour: `numeric`, minute: `numeric`}]
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const getRandomBoolean = (probability = 1) => Boolean(Math.round(Math.random() * probability));

export const getRandomElementOfArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomlyReducedArray = (arr, newLength) => {
  const arrCopy = arr.slice();
  return new Array(newLength).fill(``).map(() => arrCopy.splice(Math.random() * arrCopy.length - 1, 1)[0]);
};

export const getFormattedDate = (timeStamp, ...localFormats) => localFormats.reduce((acc, it) => {
  return `${acc} ${new Date(timeStamp).toLocaleString(...it)}`;
}, ``);

export const createElement = (html) => {
  const newElement = document.createElement(`div`);
  newElement.insertAdjacentHTML(`beforeend`, html);
  if (newElement.childElementCount === 1) {
    return newElement.firstElementChild;
  } else {
    throw new Error(`В функцию должна быть передана разметка с одним родительским элементом`);
  }
};

export const renderElement = (container, place, element) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const deleteElement = (element) => {
  if (element) {
    element.remove();
  }
};
