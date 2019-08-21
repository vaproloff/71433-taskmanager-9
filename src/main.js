import Menu from './components/menu.js';
import Search from './components/search';
import Filter from './components/filters';
import CardsSection from './components/cards-section';
import Sorting from './components/sorting';
import TaskContainer from './components/task-container';
import Task from './components/task-card.js';
import TaskEdit from './components/task-edit-card.js';
import LoadmoreButton from './components/loadmore-button';
import NoTasksMessage from './components/no-task-message';
import {filters, tasks} from './data';
import {renderElement, Position} from './utils';

const LOAD_TASKS_NUMBER = 8;

const renderTask = (taskMock, fragment) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  const onEditButtonClick = () => {
    cardsContainer.getElement().replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };
  const onSaveButtonClick = (evt) => {
    evt.preventDefault();
    cardsContainer.getElement().replaceChild(task.getElement(), taskEdit.getElement());
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
};
const renderTaskCardsFragment = (tasksNumber) => {
  const tasksFragment = document.createDocumentFragment();
  tasks.slice(cardsContainer.getElement().childElementCount, cardsContainer.getElement().childElementCount + tasksNumber).forEach((it) => renderTask(it, tasksFragment));
  renderElement(cardsContainer.getElement(), Position.BEFOREEND, tasksFragment);
};
const checkTasksAndHideButton = (button) => {
  const cardsContainer = cardsSection.getElement().querySelector(`.board__tasks`);
  if (cardsContainer.childElementCount === tasks.length) {
    button.removeElement();
  }
};

const mainContainer = document.querySelector(`main.main`);
const menuContainer = document.querySelector(`section.main__control`);

renderElement(menuContainer, Position.BEFOREEND, new Menu().getElement());
renderElement(mainContainer, Position.BEFOREEND, new Search().getElement());
renderElement(mainContainer, Position.BEFOREEND, new Filter(filters).getElement());
const cardsSection = new CardsSection();
renderElement(mainContainer, Position.BEFOREEND, cardsSection.getElement());
const sorting = new Sorting();
const cardsContainer = new TaskContainer();

if (tasks.length) {
  renderElement(cardsSection.getElement(), Position.BEFOREEND, sorting.getElement());
  renderElement(cardsSection.getElement(), Position.BEFOREEND, cardsContainer.getElement());
  renderTaskCardsFragment(LOAD_TASKS_NUMBER);
  if (cardsContainer.getElement().childElementCount < tasks.length) {
    const loadmoreButton = new LoadmoreButton();
    renderElement(cardsSection.getElement(), Position.BEFOREEND, loadmoreButton.getElement());
    loadmoreButton.getElement().addEventListener(`click`, () => {
      renderTaskCardsFragment(LOAD_TASKS_NUMBER);
      checkTasksAndHideButton(loadmoreButton);
    });
  }
} else {
  const noTaskMessage = new NoTasksMessage();
  renderElement(cardsSection.getElement(), Position.BEFOREEND, noTaskMessage.getElement());
}
