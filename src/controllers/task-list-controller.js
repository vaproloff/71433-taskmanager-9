import TaskController from './task-controller';
import {Position, renderElement, REPEATING_DAYS} from '../utils';
import moment from 'moment';

class TaskListController {
  constructor(taskContainer, onDataChange, flatpickrs) {
    this._taskContainer = taskContainer;
    this._onDataChange = onDataChange;
    this._flatpickrs = flatpickrs;

    this._tasks = [];
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
  }

  setTasks(tasks) {
    this._tasks = tasks;
    this._subscriptions = [];
    if (this._taskContainer.clearTasks) {
      this._taskContainer.clearTasks();
    }
    this._renderTaskCardsFragment(tasks);
  }

  addTasks(tasks) {
    this._renderTaskCardsFragment(tasks);
    this._tasks = this._tasks.concat(tasks);
  }

  _renderTask(task, fragment) {
    const taskController = new TaskController(this._taskContainer, fragment, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
    this._flatpickrs.push(taskController.clearFlatpickr.bind(taskController));
  }

  _renderTaskCardsFragment(tasks) {
    const tasksFragment = document.createDocumentFragment();
    tasks.forEach((it) => this._renderTask(it, tasksFragment));
    renderElement(this._taskContainer.getElement(), Position.BEFOREEND, tasksFragment);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  createNewTask() {
    const newTaskData = {
      description: ``,
      dueDate: moment().valueOf(),
      tags: [],
      color: `black`,
      repeatingDays: REPEATING_DAYS,
      isFavorite: false,
      isArchive: false,
    };
    this._renderTask(newTaskData, null);
  }
}

export default TaskListController;
