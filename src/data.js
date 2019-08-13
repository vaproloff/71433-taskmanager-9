import {returnTrueOrFalse} from "./utils";
import {getRandomElementOfArray} from "./utils";

const DAYS_IN_WEEK = 7;
const TASKS_QUANTITY = 20;
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const daysToMilliseconds = (days) => days * 24 * 60 * 60 * 1000;
const generateRandomTask = () => {
  return {
    description: getRandomElementOfArray([`Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`]),
    dueDate: Date.now() + Math.trunc(daysToMilliseconds(Math.random() * DAYS_IN_WEEK * 2 - DAYS_IN_WEEK)),
    repeatingDays: {
      'Mo': returnTrueOrFalse(),
      'Tu': false,
      'We': false,
      'Th': false,
      'Fr': false,
      'Sa': false,
      'Su': false
    },
    tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 4))),
    color: getRandomElementOfArray(COLORS),
    isFavorite: returnTrueOrFalse(),
    isArchive: returnTrueOrFalse()
  };
};
const countFitTasks = (tasks, filter) => {
  switch (filter) {
    case `all`:
      return tasks.length;
    case `overdue`:
      return tasks.reduce((acc, it) => {
        return (it.dueDate < Date.now()) ? ++acc : acc;
      }, 0);
    case `today`:
      return tasks.reduce((acc, it) => {
        return (new Date(it.dueDate).toDateString() === new Date(Date.now()).toDateString()) ? ++acc : acc;
      }, 0);
    case `favorites`:
      return tasks.reduce((acc, it) => {
        return (it.isFavorite) ? ++acc : acc;
      }, 0);
    case `repeating`:
      return tasks.reduce((acc, it) => {
        return (Object.values(it.repeatingDays).some((day) => day)) ? ++acc : acc;
      }, 0);
    case `tags`:
      return tasks.reduce((acc, it) => {
        return (it.tags.size) ? ++acc : acc;
      }, 0);
    case `archive`:
      return tasks.reduce((acc, it) => {
        return (it.isArchive) ? ++acc : acc;
      }, 0);
    default:
      return 0;
  }
};

export {COLORS};
export const taskList = new Array(TASKS_QUANTITY).fill(``).map(() => generateRandomTask());
export const filters = [
  {
    title: `All`,
    count: countFitTasks(taskList, `all`)
  }, {
    title: `Overdue`,
    count: countFitTasks(taskList, `overdue`)
  }, {
    title: `Today`,
    count: countFitTasks(taskList, `today`)
  }, {
    title: `Favorites`,
    count: countFitTasks(taskList, `favorites`)
  }, {
    title: `Repeating`,
    count: countFitTasks(taskList, `repeating`)
  }, {
    title: `Tags`,
    count: countFitTasks(taskList, `tags`)
  }, {
    title: `Archive`,
    count: countFitTasks(taskList, `archive`)
  }];
