import {returnMenuHtml} from './components/menu.js';
import {returnSearchHtml} from './components/search.js';
import {returnFiltersHtml} from './components/filters.js';
import {returnCardsSectionHtml} from './components/cards-section.js';
import {returnTaskCardHtml} from './components/task-card.js';
import {returnTaskEditCardHtml} from './components/task-edit-card.js';
import {returnLoadMoreButtonHtml} from './components/loadmore-button.js';
import {filters, tasks} from "./data";

const LOAD_TASKS_NUMBER = 8;

const renderNode = (container, place, html) => {
  container.insertAdjacentHTML(place, html);
};
const renderTaskCards = (taskList) => taskList.reduce((acc, it) => acc + returnTaskCardHtml(it), ``);
const checkTasksAndHideButton = () => {
  if (cardsContainer.childElementCount === tasks.length) {
    loadmoreButton.classList.add(`visually-hidden`);
  }
};

// Подготовка и наполнение контейнера для контента
const mainContainer = document.querySelector(`main.main`);
const menuContainer = document.querySelector(`section.main__control`);

const mainContentFragment = document.createElement(`div`);
mainContentFragment.append(menuContainer);
renderNode(menuContainer, `beforeend`, returnMenuHtml());
renderNode(mainContentFragment, `beforeend`, returnSearchHtml());
renderNode(mainContentFragment, `beforeend`, returnFiltersHtml(filters));
renderNode(mainContentFragment, `beforeend`, returnCardsSectionHtml());

const cardsSection = mainContentFragment.querySelector(`section.board`);
const cardsContainer = cardsSection.querySelector(`div.board__tasks`);
// Первоначальный рендеринг карточек
renderNode(cardsContainer, `beforeend`, returnTaskEditCardHtml(tasks[0]));
renderNode(cardsContainer, `beforeend`, renderTaskCards(tasks.slice(cardsContainer.childElementCount, cardsContainer.childElementCount + LOAD_TASKS_NUMBER - 1)));
renderNode(cardsSection, `beforeend`, returnLoadMoreButtonHtml());
const loadmoreButton = cardsSection.querySelector(`button.load-more`);
checkTasksAndHideButton();
mainContainer.append(mainContentFragment);

// Подгрузка карточек по кнопке Loadmore
loadmoreButton.addEventListener(`click`, () => {
  renderNode(cardsContainer, `beforeend`, renderTaskCards(tasks.slice(cardsContainer.childElementCount, cardsContainer.childElementCount + LOAD_TASKS_NUMBER)));
  checkTasksAndHideButton();
});
