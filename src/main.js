import Menu from './components/menu.js';
import Search from './components/search';
import Filter from './components/filters';
import CardsSection from './components/cards-section';
import LoadmoreButton from './components/loadmore-button';
import Task from './components/task-card.js';
import TaskEdit from './components/task-edit-card.js';
import {filters, tasks} from './data';
import {renderElement, Position} from './utils';

const LOAD_TASKS_NUMBER = 8;

const renderTask = (taskMock, container) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  const onEditButtonClick = () => {
    cardsContainer.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };
  const onSaveButtonClick = (evt) => {
    evt.preventDefault();
    cardsContainer.replaceChild(task.getElement(), taskEdit.getElement());
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

renderElement(menuContainer, Position.BEFOREEND, new Menu().getElement());
renderElement(mainContainer, Position.BEFOREEND, new Search().getElement());
renderElement(mainContainer, Position.BEFOREEND, new Filter(filters).getElement());
renderElement(mainContainer, Position.BEFOREEND, new CardsSection().getElement());

// Первоначальный рендеринг карточек
const cardsSection = mainContainer.querySelector(`section.board`);
const cardsContainer = cardsSection.querySelector(`div.board__tasks`);
renderTaskCardsFragment(LOAD_TASKS_NUMBER);

// Рендеринг кнопки Loadmore
renderElement(cardsSection, Position.BEFOREEND, new LoadmoreButton().getElement());
const loadmoreButton = cardsSection.querySelector(`button.load-more`);
checkTasksAndHideButton();

// Подгрузка карточек по кнопке Loadmore
loadmoreButton.addEventListener(`click`, () => {
  renderTaskCardsFragment(LOAD_TASKS_NUMBER);
  checkTasksAndHideButton();
});
