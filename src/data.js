import {returnTrueOrFalse} from "./utils";
import {getRandomElementOfArray} from "./utils";

const DAYS_IN_WEEK = 7;
const TASKS_NUMBER = 25;
const MAX_TAGS_NUMBER = 3;
const PROBABILITY_COEFFICIENT = 0.6;
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`, `lecture`, `project`, `graduation`];
const TASK_DESCRIPTIONS = [
  `Прослушать лекцию`,
  `Изучить теорию`,
  `Пройти демки`,
  `Посмотреть доп. материалы`,
  `Сделать домашку`,
  `Защитить проект`,
  `Пройти интенсив на соточку`
];

const daysToMilliseconds = (days) => days * 24 * 60 * 60 * 1000;

const generateRandomTask = () => ({
  description: getRandomElementOfArray(TASK_DESCRIPTIONS),
  dueDate: Date.now() + Math.trunc(daysToMilliseconds(Math.random() * DAYS_IN_WEEK * 2 - DAYS_IN_WEEK)),
  repeatingDays: {
    'Mo': returnTrueOrFalse(PROBABILITY_COEFFICIENT),
    'Tu': returnTrueOrFalse(PROBABILITY_COEFFICIENT),
    'We': returnTrueOrFalse(PROBABILITY_COEFFICIENT),
    'Th': returnTrueOrFalse(PROBABILITY_COEFFICIENT),
    'Fr': returnTrueOrFalse(PROBABILITY_COEFFICIENT),
    'Sa': returnTrueOrFalse(PROBABILITY_COEFFICIENT),
    'Su': returnTrueOrFalse(PROBABILITY_COEFFICIENT)
  },
  tags: new Set(TAGS.sort(() => Math.random() - 0.5).slice(0, Math.round(Math.random() * MAX_TAGS_NUMBER))),
  color: getRandomElementOfArray(COLORS),
  isFavorite: returnTrueOrFalse(),
  isArchive: returnTrueOrFalse()
});

const tasks = new Array(TASKS_NUMBER).fill(``).map(() => generateRandomTask());

const filters = [
  {
    title: `All`,
    count: tasks.length
  }, {
    title: `Overdue`,
    count: tasks.reduce((acc, it) => {
      return (it.dueDate < Date.now()) ? ++acc : acc;
    }, 0)
  }, {
    title: `Today`,
    count: tasks.reduce((acc, it) => {
      return (new Date(it.dueDate).toDateString() === new Date(Date.now()).toDateString()) ? ++acc : acc;
    }, 0)
  }, {
    title: `Favorites`,
    count: tasks.reduce((acc, it) => {
      return (it.isFavorite) ? ++acc : acc;
    }, 0)
  }, {
    title: `Repeating`,
    count: tasks.reduce((acc, it) => {
      return (Object.values(it.repeatingDays).some((day) => day)) ? ++acc : acc;
    }, 0)
  }, {
    title: `Tags`,
    count: tasks.reduce((acc, it) => {
      return (it.tags.size) ? ++acc : acc;
    }, 0)
  }, {
    title: `Archive`,
    count: tasks.reduce((acc, it) => {
      return (it.isArchive) ? ++acc : acc;
    }, 0)
  }];

export {COLORS, tasks, filters};
