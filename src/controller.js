import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filters';
import CardsSection from './components/cards-section';
import Sorting from './components/sorting';
import TaskContainer from './components/task-container';
import Task from './components/task-card';
import TaskEdit from './components/task-edit-card';
import LoadmoreButton from './components/loadmore-button';
import NoTasksMessage from './components/no-task-message';
import {Position, renderElement} from './utils';
import {LOAD_TASKS_NUMBER} from './data';

class Controller {
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
    this._uneditedTask = null;
    this._editingTask = null;
  }

  _renderTask(taskMock, fragment) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);
    const onEditButtonClick = () => {
      if (this._editingTask) {
        this._taskContainer.getElement().replaceChild(this._uneditedTask.getElement(), this._editingTask.getElement());
      }
      this._uneditedTask = task;
      this._editingTask = taskEdit;
      this._taskContainer.getElement().replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    const onSaveButtonClick = (evt) => {
      evt.preventDefault();
      this._uneditedTask = null;
      this._editingTask = null;
      this._taskContainer.getElement().replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onSaveButtonClick(evt);
      }
    };
    taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, onEditButtonClick);
    taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, onSaveButtonClick);

    renderElement(fragment, Position.BEFOREEND, task.getElement());
  }

  _renderTaskCardsFragment(tasksNumber) {
    const tasksFragment = document.createDocumentFragment();
    this._tasks.slice(this._taskContainer.getElement().childElementCount, this._taskContainer.getElement().childElementCount + tasksNumber).forEach((it) => this._renderTask(it, tasksFragment));
    renderElement(this._taskContainer.getElement(), Position.BEFOREEND, tasksFragment);
  }

  _checkTasksAndHideButton() {
    if (this._taskContainer.getElement().childElementCount === this._tasks.length) {
      this._loadmoreButton.removeElement();
    }
  }

  init() {
    renderElement(this._menuContainer, Position.BEFOREEND, this._menu.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._search.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._filter.getElement());
    renderElement(this._mainContainer, Position.BEFOREEND, this._cardsSection.getElement());

    if (this._tasks.length) {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._sorting.getElement());
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._taskContainer.getElement());
      this._renderTaskCardsFragment(LOAD_TASKS_NUMBER);
      if (this._cardsSection.getElement().childElementCount < this._tasks.length) {
        renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._loadmoreButton.getElement());
        this._loadmoreButton.getElement().addEventListener(`click`, () => {
          this._renderTaskCardsFragment(LOAD_TASKS_NUMBER);
          this._checkTasksAndHideButton(this._loadmoreButton);
        });
      }
    } else {
      renderElement(this._cardsSection.getElement(), Position.BEFOREEND, this._noTaskMessage.getElement());
    }
  }
}

export default Controller;
