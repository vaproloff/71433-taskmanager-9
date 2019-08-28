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
import TaskController from './task-controller';

class BoardController {
  constructor(mainContainer, filters, tasks) {
    this._mainContainer = mainContainer;
    this._menuContainer = mainContainer.querySelector(`section.main__control`);
    this._menu = new Menu();
    this._search = new Search();
    this._filter = new Filter(filters);
    this._cardsSection = new CardsSection();
    this._sorting = new Sorting();
    this._taskContainer = new TaskContainer();
    this._loadmoreButton = new LoadmoreButton();
    this._noTaskMessage = new NoTasksMessage();
    this._tasks = tasks;
    this._sortedTasks = this._tasks;
  }

  _renderTask(task, fragment) {
    const taskController = new TaskController(this._taskContainer, fragment, task);
  }

  _renderTaskCardsFragment(tasks, tasksNumber) {
    const tasksFragment = document.createDocumentFragment();
    tasks.slice(this._taskContainer.getElement().childElementCount, this._taskContainer.getElement().childElementCount + tasksNumber).forEach((it) => this._renderTask(it, tasksFragment));
    renderElement(this._taskContainer.getElement(), Position.BEFOREEND, tasksFragment);
  }

  _checkTasksAndShowButton() {
    if (this._taskContainer.getElement().childElementCount < this._sortedTasks.length) {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._loadmoreButton.getElement());
      this._loadmoreButton.getElement().addEventListener(`click`, () => {
        this._renderTaskCardsFragment(this._sortedTasks, LOAD_TASKS_NUMBER);
        this._checkTasksAndHideButton();
      });
    }
  }

  _checkTasksAndHideButton() {
    if (this._taskContainer.getElement().childElementCount === this._sortedTasks.length) {
      this._loadmoreButton.removeElement();
    }
  }

  _onSortingClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A`) {
      const currentTasksCount = this._taskContainer.getElement().childElementCount;
      this._taskContainer.clearTasks();
      switch (evt.target.dataset.sortType) {
        case `date-up`:
          this._sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
          break;
        case `date-down`:
          this._sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
          break;
        case `default`:
          this._sortedTasks = this._tasks;
          break;
      }
      this._renderTaskCardsFragment(this._sortedTasks, currentTasksCount);
    }
  }

  init() {
    renderElement(this._menuContainer, Position.BEFOREEND, this._menu.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._search.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._filter.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._cardsSection.getElement());

    if (this._sortedTasks.length) {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._sorting.getElement());
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._taskContainer.getElement());
      this._renderTaskCardsFragment(this._sortedTasks, LOAD_TASKS_NUMBER);
      this._sorting.getElement().addEventListener(`click`, (evt) => this._onSortingClick(evt));
      this._checkTasksAndShowButton();
    } else {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._noTaskMessage.getElement());
    }
  }
}

export default BoardController;
