import AbstractComponent from './abstract-component';
import {Position, renderElement} from '../utils';

const DEFAULT_FILTER = `All`;

class Filter extends AbstractComponent {
  constructor(tasks) {
    super();
    this._tasks = tasks;
    this._filters = this._getFilters(this._tasks);
  }

  refreshFilters(tasks) {
    this._filters = this._getFilters(tasks);
    const place = document.querySelector(`.main__search`);
    this.removeElement();
    renderElement(place, Position.AFTEREND, this.getElement());
  }

  _getFilters(tasks) {
    const tasksAll = tasks.filter((it) => !it.isArchive);
    const tasksArchived = tasks.filter((it) => it.isArchive);
    return [
      {
        title: `All`,
        count: tasksAll.length
      }, {
        title: `Overdue`,
        count: tasksAll.reduce((acc, it) => {
          return (it.dueDate < Date.now()) ? ++acc : acc;
        }, 0)
      }, {
        title: `Today`,
        count: tasksAll.reduce((acc, it) => {
          return (new Date(it.dueDate).toDateString() === new Date(Date.now()).toDateString()) ? ++acc : acc;
        }, 0)
      }, {
        title: `Favorites`,
        count: tasksAll.reduce((acc, it) => {
          return (it.isFavorite) ? ++acc : acc;
        }, 0)
      }, {
        title: `Repeating`,
        count: tasksAll.reduce((acc, it) => {
          return (Object.values(it.repeatingDays).some((day) => day)) ? ++acc : acc;
        }, 0)
      }, {
        title: `Tags`,
        count: tasksAll.reduce((acc, it) => {
          return (it.tags.size) ? ++acc : acc;
        }, 0)
      }, {
        title: `Archive`,
        count: tasksArchived.length
      }];
  }

  getTemplate() {
    return `
      <section class="main__filter filter container">
        ${this._filters.map((it) => `
          <input
            type="radio"
            id="filter__${it.title}"
            class="filter__input visually-hidden"
            name="filter"
            ${(it.title === DEFAULT_FILTER) ? `checked` : ``} ${!it.count ? `disabled` : ``}
          />
          <label for="filter__${it.title}" class="filter__label">
            ${it.title} <span class="filter__${it.title}-count">${it.count}</span></label
          >`).join(``)}
      </section>`;

  }
}

export default Filter;
