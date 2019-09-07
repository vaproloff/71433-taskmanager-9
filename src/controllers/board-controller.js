import Menu from './../components/menu';
import Search from './../components/search';
import Filter from './../components/filters';
import CardsSection from './../components/cards-section';
import Sorting from './../components/sorting';
import TaskContainer from './../components/task-container';
import LoadmoreButton from './../components/loadmore-button';
import NoTasksMessage from './../components/no-task-message';
import {Position, renderElement} from './../utils';
import {LOAD_TASKS_NUMBER} from './../data';
import Statistics from '../components/statistics';
import TaskListController from './task-list-controller';
import SearchController from './search-controller';

class BoardController {
  constructor(mainContainer, tasks) {
    this._mainContainer = mainContainer;
    this._menuContainer = mainContainer.querySelector(`section.main__control`);
    this._menu = new Menu();
    this._search = new Search();
    this._filter = new Filter(tasks);
    this._cardsSection = new CardsSection();
    this._sorting = new Sorting();
    this._taskContainer = new TaskContainer();
    this._loadmoreButton = new LoadmoreButton();
    this._statistics = new Statistics();
    this._noTaskMessage = new NoTasksMessage();
    this._tasks = tasks;
    this._sortedTasks = this._tasks.filter((it) => !it.isArchive);
    this._renderedTaskCount = 0;
    this._currentScreen = `control__task`;
    this._currentSortType = `default`;
    this._nowCreating = false;

    this._flatpickrs = [];
    this._onDataChange = this._onDataChange.bind(this);

    this._taskListController = new TaskListController(this._taskContainer, this._onDataChange, this._flatpickrs);
  }

  _onDataChange(newTask, oldTask) {
    this._nowCreating = false;
    const taskIndex = this._tasks.findIndex((it) => it === oldTask);
    if (!newTask) {
      this._tasks.splice(taskIndex, 1);
    } else if (taskIndex === -1) {
      this._tasks.unshift(newTask);
      this._renderedTaskCount = this._taskContainer.getElement().childElementCount;
    } else {
      this._tasks[taskIndex] = newTask;
    }
    this._filter.refreshFilters(this._tasks);
    this._flatpickrs.forEach((it) => it());
    this._sortTasks();
    this._renderTaskBoard(this._sortedTasks.filter((it) => !it.isArchive), this._renderedTaskCount);
  }

  _renderTaskBoard(tasks, taskCount) {
    this._taskListController.setTasks(tasks.slice(0, taskCount));
    this._checkTasksAndHideButton();
    if (this._cardsSection.getElement().querySelector(`.load-more`)) {
      this._checkTasksAndShowButton();
    }
  }

  _checkTasksAndShowButton() {
    if (this._taskContainer.getElement().childElementCount < this._sortedTasks.length) {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._loadmoreButton.getElement());
      this._loadmoreButton.getElement().addEventListener(`click`, () => {
        this._taskListController.addTasks(this._sortedTasks.slice(this._renderedTaskCount, this._renderedTaskCount + LOAD_TASKS_NUMBER));
        this._renderedTaskCount = this._taskContainer.getElement().childElementCount;
        this._checkTasksAndHideButton();
      });
    }
  }

  _checkTasksAndHideButton() {
    if (this._taskContainer.getElement().childElementCount === this._sortedTasks.length) {
      this._loadmoreButton.removeElement();
    }
  }

  _sortTasks() {
    switch (this._currentSortType) {
      case `date-up`:
        this._sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case `date-down`:
        this._sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case `default`:
        this._sortedTasks = this._tasks.slice();
        break;
    }
  }

  _onSortingClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A`) {
      this._currentSortType = evt.target.dataset.sortType;
      this._sortTasks();
      this._renderTaskBoard(this._sortedTasks.filter((it) => !it.isArchive), this._renderedTaskCount);
    }
  }

  init() {
    renderElement(this._menuContainer, Position.BEFOREEND, this._menu.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._search.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._filter.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._cardsSection.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._statistics.getElement());
    this._searchController = new SearchController(this._mainContainer, this._search, () => {
      this._statistics.getElement().classList.add(`visually-hidden`);
      this._searchController.hide();
      this._cardsSection.getElement().classList.remove(`visually-hidden`);
    }, this._onDataChange, this._flatpickrs);
    this._search.getElement().addEventListener(`click`, () => {
      this._statistics.getElement().classList.add(`visually-hidden`);
      this._cardsSection.getElement().classList.add(`visually-hidden`);
      this._searchController.show(this._tasks);
    });


    this._menu.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName === `LABEL` && this._currentScreen !== evt.target.control.id) {
        switch (evt.target.control.id) {
          case `control__statistic`:
            this._cardsSection.getElement().classList.add(`visually-hidden`);
            this._statistics.getElement().classList.remove(`visually-hidden`);
            this._searchController.hide();
            this._currentScreen = evt.target.control.id;
            evt.target.control.checked = true;
            break;
          case `control__task`:
            this._statistics.getElement().classList.add(`visually-hidden`);
            this._cardsSection.getElement().classList.remove(`visually-hidden`);
            this._searchController.hide();
            this._currentScreen = evt.target.control.id;
            evt.target.control.checked = true;
            break;
          case `control__new-task`:
            this._searchController.hide();
            this._statistics.getElement().classList.add(`visually-hidden`);
            this._cardsSection.getElement().classList.remove(`visually-hidden`);
            if (!this._nowCreating) {
              this._nowCreating = true;
              this._taskListController.createNewTask();
            }
            this._menu.getElement().querySelector(`#control__task`).checked = true;
            this._currentScreen = `control__task`;
            break;
        }
      }
    });

    if (this._sortedTasks.length) {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._sorting.getElement());
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._taskContainer.getElement());
      this._renderTaskBoard(this._sortedTasks, LOAD_TASKS_NUMBER);
      this._renderedTaskCount = this._taskContainer.getElement().childElementCount;
      this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortingClick(evt));
      this._checkTasksAndShowButton();
    } else {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._noTaskMessage.getElement());
    }
  }
}

export default BoardController;
