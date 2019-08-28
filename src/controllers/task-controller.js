import Task from '../components/task-card';
import TaskEdit from '../components/task-edit-card';
import {Position, renderElement} from '../utils';

class TaskController {
  constructor(container, fragment, taskData) {
    this._taskContainer = container;
    this._fragment = fragment;
    this._task = new Task(taskData);
    this._taskEdit = new TaskEdit(taskData);

    this.init();
  }

  init() {
    const onEditButtonClick = () => {
      this._taskContainer.getElement().replaceChild(this._taskEdit.getElement(), this._task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    const onSaveButtonClick = (evt) => {
      evt.preventDefault();
      this._taskContainer.getElement().replaceChild(this._task.getElement(), this._taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onSaveButtonClick(evt);
      }
    };
    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    this._task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, onEditButtonClick);
    this._taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, onSaveButtonClick);

    renderElement(this._fragment, Position.BEFOREEND, this._task.getElement());
  }
}

export default TaskController;
