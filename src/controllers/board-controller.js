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
    this._noTaskMessage = new NoTasksMessage();
    this._tasks = tasks;
    this._sortedTasks = this._tasks.filter((it) => !it.isArchive);
    this._renderedTaskCount = 0;

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _onDataChange(newTask, oldTask) {
    this._tasks[this._tasks.indexOf(oldTask)] = newTask;
    this._filter.refreshFilters(this._tasks);
    this._sortedTasks[this._sortedTasks.indexOf(oldTask)] = newTask;
    this._sortedTasks = this._sortedTasks.filter((it) => !it.isArchive);

    this._renderTaskBoard(this._sortedTasks, this._renderedTaskCount);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _renderTask(task, fragment) {
    const taskController = new TaskController(this._taskContainer, fragment, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _renderTaskCardsFragment(tasks, tasksNumber) {
    const tasksFragment = document.createDocumentFragment();
    const startTaskIndex = this._taskContainer.getElement().childElementCount;
    const endTaskIndex = this._taskContainer.getElement().childElementCount + tasksNumber;
    tasks.slice(startTaskIndex, endTaskIndex).forEach((it) => this._renderTask(it, tasksFragment));
    renderElement(this._taskContainer.getElement(), Position.BEFOREEND, tasksFragment);
  }

  _renderTaskBoard(tasks, taskCount) {
    this._taskContainer.clearTasks();
    this._renderTaskCardsFragment(tasks, taskCount);
    this._checkTasksAndHideButton();
  }

  _checkTasksAndShowButton() {
    if (this._taskContainer.getElement().childElementCount < this._sortedTasks.length) {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._loadmoreButton.getElement());
      this._loadmoreButton.getElement().addEventListener(`click`, () => {
        this._renderTaskCardsFragment(this._sortedTasks, LOAD_TASKS_NUMBER);
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

  _onSortingClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A`) {
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
      this._renderTaskBoard(this._sortedTasks, this._renderedTaskCount);
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
