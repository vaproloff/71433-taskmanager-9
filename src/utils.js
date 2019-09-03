export const REPEATING_DAYS = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const getRandomBoolean = (probability = 1) => Boolean(Math.round(Math.random() * probability));

export const getRandomElementOfArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomlyReducedArray = (arr, newLength) => {
  const arrCopy = arr.slice();
  return new Array(newLength).fill(``).map(() => arrCopy.splice(Math.random() * arrCopy.length - 1, 1)[0]);
};

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
    case Position.AFTEREND:
      container.after(element);
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
