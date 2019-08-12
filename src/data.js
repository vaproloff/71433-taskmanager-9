import {returnTrueOrFalse} from "./utils";
import {getRandomElementOfArray} from "./utils";

const DAYS_IN_WEEK = 7;
const daysToMilliseconds = (days) => days * 24 * 60 * 60 * 1000;

export const generateRandomTask = () => {
  return {
    description: getRandomElementOfArray([`Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`]),
    dueDate: Date.now() + daysToMilliseconds(Math.random() * DAYS_IN_WEEK * 2 - DAYS_IN_WEEK),
    repeatingDays: {
      'Mo': returnTrueOrFalse(),
      'Tu': returnTrueOrFalse(),
      'We': returnTrueOrFalse(),
      'Th': returnTrueOrFalse(),
      'Fr': returnTrueOrFalse(),
      'Sa': returnTrueOrFalse(),
      'Su': returnTrueOrFalse()
    },
    tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 4))),
    color: getRandomElementOfArray([`black`, `yellow`, `blue`, `green`, `pink`]),
    isFavorite: returnTrueOrFalse(),
    isArchive: returnTrueOrFalse()
  };
};
