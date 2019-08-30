import {getRandomBoolean, getRandomElementOfArray, getRandomlyReducedArray} from './utils';

const DAYS_IN_WEEK = 7;
const TASKS_NUMBER = 25;
const MAX_TAGS_NUMBER = 3;
const LOAD_TASKS_NUMBER = 8;
const PROBABILITY_COEFFICIENT = 0.6;
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`, `lecture`, `project`, `graduation`];
const SHORT_WEEK_DAYS = [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`];
const TASK_DESCRIPTIONS = [
  `Прослушать лекцию`,
  `Изучить теорию`,
  `Пройти демки`,
  `Посмотреть доп. материалы`,
  `Сделать домашку`,
  `Защитить проект`,
  `Пройти интенсив на соточку`
];

const convertDaysToMilliseconds = (days) => days * 24 * 60 * 60 * 1000;
const getRepeatingDays = (days) => days.reduce((acc, it) => {
  acc[it] = getRandomBoolean(PROBABILITY_COEFFICIENT);
  return acc;
}, {});

const generateRandomTask = () => ({
  description: getRandomElementOfArray(TASK_DESCRIPTIONS),
  dueDate: Date.now() + Math.trunc(convertDaysToMilliseconds(Math.random() * DAYS_IN_WEEK * 2 - DAYS_IN_WEEK)),
  repeatingDays: getRepeatingDays(SHORT_WEEK_DAYS),
  tags: [...new Set(getRandomlyReducedArray(TAGS, Math.round(Math.random() * MAX_TAGS_NUMBER)))],
  color: getRandomElementOfArray(COLORS),
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean()
});

const tasks = new Array(TASKS_NUMBER).fill(``).map(() => generateRandomTask());

export {COLORS, tasks, LOAD_TASKS_NUMBER, SHORT_WEEK_DAYS};
