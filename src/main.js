import {returnMenuHtml} from './components/menu.js';
import {returnSearchHtml} from './components/search';
import {returnFiltersHtml} from './components/filters';
import {returnCardsSectionHtml} from './components/cards-section';
import {returnLoadmoreButtonHtml} from './components/loadmore-button';
import Task from './components/task-card.js';
import TaskEdit from './components/task-edit-card.js';
import {filters, tasks} from './data';
import {renderElement, Position, createElement} from './utils';

const LOAD_TASKS_NUMBER = 8;

const renderTask = (taskMock, container) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  const replaceTaskToEdit = () => {
    cardsContainer.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };
  const replaceEditToTask = (evt) => {
    evt.preventDefault();
    cardsContainer.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      replaceEditToTask(evt);
    }
  };
  taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, replaceTaskToEdit);
  taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, replaceEditToTask);

  renderElement(container, Position.BEFOREEND, task.getElement());
};
const renderTaskCardsFragment = (tasksNumber) => {
  const tasksFragment = document.createDocumentFragment();
  tasks.slice(cardsContainer.childElementCount, cardsContainer.childElementCount + tasksNumber).forEach((it) => renderTask(it, tasksFragment));
  renderElement(cardsContainer, Position.BEFOREEND, tasksFragment);
};
const checkTasksAndHideButton = () => {
  if (cardsContainer.childElementCount === tasks.length) {
    loadmoreButton.classList.add(`visually-hidden`);
  }
};

// Подготовка и наполнение контейнера для контента
const mainContainer = document.querySelector(`main.main`);
const menuContainer = document.querySelector(`section.main__control`);

const mainContentFragment = document.createDocumentFragment();
renderElement(mainContentFragment, Position.BEFOREEND, menuContainer);
renderElement(menuContainer, Position.BEFOREEND, createElement(returnMenuHtml()));
renderElement(mainContentFragment, Position.BEFOREEND, createElement(returnSearchHtml()));
renderElement(mainContentFragment, Position.BEFOREEND, createElement(returnFiltersHtml(filters)));
renderElement(mainContentFragment, Position.BEFOREEND, createElement(returnCardsSectionHtml()));

// Первоначальный рендеринг карточек
const cardsSection = mainContentFragment.querySelector(`section.board`);
const cardsContainer = cardsSection.querySelector(`div.board__tasks`);
renderTaskCardsFragment(LOAD_TASKS_NUMBER);

// Рендеринг кнопки Loadmore
renderElement(cardsSection, Position.BEFOREEND, createElement(returnLoadmoreButtonHtml()));
const loadmoreButton = cardsSection.querySelector(`button.load-more`);
checkTasksAndHideButton();

// Отрисовка подготовленного фрагмента в главный контейнер
renderElement(mainContainer, Position.BEFOREEND, mainContentFragment);

// Подгрузка карточек по кнопке Loadmore
loadmoreButton.addEventListener(`click`, () => {
  renderTaskCardsFragment(LOAD_TASKS_NUMBER);
  checkTasksAndHideButton();
});
