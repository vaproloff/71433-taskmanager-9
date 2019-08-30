import Task from './../components/task-card';
import TaskEdit from './../components/task-edit-card';
import {Position, renderElement} from './../utils';

class TaskController {
  constructor(taskContainer, fragment, taskData, onDataChange, onChangeView) {
    this._taskContainer = taskContainer;
    this._fragment = fragment;
    this._taskData = taskData;
    this._task = new Task(taskData);
    this._taskEdit = new TaskEdit(taskData);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this.init();
  }

  init() {
    const onEditButtonClick = () => {
      this._onChangeView();
      this._taskContainer.getElement().replaceChild(this._taskEdit.getElement(), this._task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    const onEditingTaskClose = () => {
      this._taskContainer.getElement().replaceChild(this._task.getElement(), this._taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    const onSaveButtonClick = (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
      const newTaskData = {
        description: formData.get(`text`),
        dueDate: new Date(formData.get(`date`)).setFullYear(2019),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false
        }),
        tags: [...new Set(formData.getAll(`hashtag`))],
        color: formData.get(`color`),
        isFavorite: Boolean(!this._taskEdit.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)),
        isArchive: Boolean(!this._taskEdit.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`))
      };
      this._onDataChange(newTaskData, this._taskData);

      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onEditingTaskClose();
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

  setDefaultView() {
    if (this._taskContainer.getElement().contains(this._taskEdit.getElement())) {
      this._taskContainer.getElement().replaceChild(this._task.getElement(), this._taskEdit.getElement());
    }
  }
}

export default TaskController;
