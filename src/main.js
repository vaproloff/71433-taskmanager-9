import {returnMenuHtml} from './components/menu.js';
import {returnSearchHtml} from './components/search.js';
import {returnFiltersHtml} from './components/filters.js';
import {returnCardsSectionHtml} from './components/cards-section.js';
import {returnTaskCardHtml} from './components/task-card.js';
import {returnTaskEditCardHtml} from './components/task-edit-card.js';
import {returnLoadMoreButtonHtml} from './components/loadmore-button.js';
import {filters, tasks} from "./data";

const LOAD_TASKS_NUMBER = 8;

// Функция, отрисовывающая разметку в заданный контейнер
const renderNode = (container, place, html) => {
  container.insertAdjacentHTML(place, html);
};

const renderTaskCards = (taskList) => {
  if (cardsContainer.childElementCount === 0) {
    renderNode(cardsContainer, `beforeend`, returnTaskEditCardHtml(taskList[0]));
    taskList.slice(1).forEach((it) => renderNode(cardsContainer, `beforeend`, returnTaskCardHtml(it)));
  } else {
    taskList.forEach((it) => renderNode(cardsContainer, `beforeend`, returnTaskCardHtml(it)));
    if (cardsContainer.childElementCount === tasks.length) {
      loadmoreButton.classList.add(`visually-hidden`);
    }
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
renderTaskCards(tasks.slice(cardsContainer.childElementCount, cardsContainer.childElementCount + LOAD_TASKS_NUMBER));
renderNode(cardsSection, `beforeend`, returnLoadMoreButtonHtml());
const loadmoreButton = cardsSection.querySelector(`button.load-more`);
if (cardsContainer.childElementCount === tasks.length) {
  loadmoreButton.classList.add(`visually-hidden`);
}
mainContainer.append(mainContentFragment);

loadmoreButton.addEventListener(`click`, () => {
  renderTaskCards(tasks.slice(cardsContainer.childElementCount, cardsContainer.childElementCount + 8));
});
