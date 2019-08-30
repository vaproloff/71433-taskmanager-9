import Task from './../components/task-card';
import TaskEdit from './../components/task-edit-card';
import {createElement, Position, renderElement} from './../utils';
import {COLORS} from '../data';

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
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onEditingTaskClose();
      }
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
        isFavorite: this._taskData.isFavorite,
        isArchive: this._taskData.isArchive
      };
      this._onDataChange(newTaskData, this._taskData);

      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    const onToArchiveClick = () => {
      const newTaskData = Object.assign({}, this._taskData);
      newTaskData.isArchive = true;
      this._onDataChange(newTaskData, this._taskData);
    };
    const onToFavoritesClick = () => {
      const newTaskData = Object.assign({}, this._taskData);
      newTaskData.isFavorite = !newTaskData.isFavorite;
      this._onDataChange(newTaskData, this._taskData);
    };
    const onDateTogglerClick = () => {
      const dateField = this._taskEdit.getElement().querySelector(`.card__date-deadline`);
      dateField.disabled = !dateField.disabled;
      if (dateField.disabled) {
        this._taskEdit.getElement().querySelector(`.card__date-status`).innerText = `NO`;
      } else {
        this._taskEdit.getElement().querySelector(`.card__date-status`).innerText = `YES`;
      }
      dateField.querySelector(`.card__date`).value = null;
    };
    const onRepeatTogglerClick = () => {
      const repeatField = this._taskEdit.getElement().querySelector(`.card__repeat-days`);
      repeatField.disabled = !repeatField.disabled;
      this._taskEdit.getElement().classList.toggle(`card--repeat`);
      if (repeatField.disabled) {
        this._taskEdit.getElement().querySelector(`.card__repeat-status`).innerText = `NO`;
        repeatField.querySelectorAll(`.card__repeat-day-input`).forEach((it) => {
          it.checked = false;
        });
      } else {
        this._taskEdit.getElement().querySelector(`.card__repeat-status`).innerText = `YES`;
      }
    };
    const onColorClick = (evt) => {
      if (evt.target.tagName === `INPUT`) {
        COLORS.forEach((it) => {
          this._taskEdit.getElement().classList.remove(`card--${it}`);
        });
        this._taskEdit.getElement().classList.add(`card--${evt.target.value}`);
      }
    };
    const onTagEnter = (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        const tagList = this._taskEdit.getElement().querySelector(`.card__hashtag-list`);
        const newTagElement = createElement(this._taskEdit.addHashtag(evt.target.value));
        renderElement(tagList, Position.BEFOREEND, newTagElement);
        evt.target.value = ``;
      }
    };

    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    this._task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, onEditButtonClick);
    this._task.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, onToArchiveClick);
    this._task.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, onToFavoritesClick);

    this._taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, onSaveButtonClick);
    this._taskEdit.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, onToArchiveClick);
    this._taskEdit.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, onToFavoritesClick);

    this._taskEdit.getElement().querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, onDateTogglerClick);
    this._taskEdit.getElement().querySelector(`.card__repeat-toggle`).addEventListener(`click`, onRepeatTogglerClick);
    this._taskEdit.getElement().querySelector(`.card__colors-wrap`).addEventListener(`click`, onColorClick);
    this._taskEdit.getElement().querySelector(`.card__hashtag-input`).addEventListener(`keydown`, onTagEnter);

    renderElement(this._fragment, Position.BEFOREEND, this._task.getElement());
  }

  setDefaultView() {
    if (this._taskContainer.getElement().contains(this._taskEdit.getElement())) {
      this._taskContainer.getElement().replaceChild(this._task.getElement(), this._taskEdit.getElement());
    }
  }
}

export default TaskController;
