import {returnMenuHtml} from './components/menu.js';
import {returnSearchHtml} from './components/search.js';
import {returnFiltersHtml} from './components/filters.js';
import {returnCardsSectionHtml} from './components/cards-section.js';
import {returnTaskCardHtml} from './components/task-card.js';
import {returnTaskEditCardHtml} from './components/task-edit-card.js';
import {returnLoadMoreButtonHtml} from './components/loadmore-button.js';
import {filters} from "./data";
import {taskList} from "./data";

// Функция, отрисовывающая разметку в заданный контейнер
const renderNode = (container, html) => {
  const node = document.createElement(`div`);
  node.innerHTML = html;
  container.appendChild(node.children[0]);
};

const renderTaskCards = (tasks) => {
  if (cardsContainer.childElementCount === 0) {
    renderNode(cardsContainer, returnTaskEditCardHtml(tasks[0]));
    tasks.slice(1).forEach((it) => renderNode(cardsContainer, returnTaskCardHtml(it)));
  } else {
    tasks.forEach((it) => renderNode(cardsContainer, returnTaskCardHtml(it)));
  }
  if (cardsContainer.childElementCount === taskList.length) {
    loadmoreButton.classList.add(`visually-hidden`);
  }
};

const mainContainer = document.querySelector(`main.main`);

// Подготовка и наполнение контейнера для контента
const mainContentFragment = document.createDocumentFragment();
const menuContainer = document.querySelector(`.main__control`);
mainContentFragment.appendChild(menuContainer);
renderNode(menuContainer, returnMenuHtml());
renderNode(mainContentFragment, returnSearchHtml());
renderNode(mainContentFragment, returnFiltersHtml(filters));
renderNode(mainContentFragment, returnCardsSectionHtml());
const cardsContainer = mainContentFragment.querySelector(`.board__tasks`);
renderTaskCards(taskList.slice(cardsContainer.childElementCount, cardsContainer.childElementCount + 8));
const cardsSection = mainContentFragment.querySelector(`section.board`);
if (cardsContainer.childElementCount < taskList.length) {
  renderNode(cardsSection, returnLoadMoreButtonHtml());
}

mainContainer.appendChild(mainContentFragment);

const loadmoreButton = mainContainer.querySelector(`button.load-more`);
loadmoreButton.addEventListener(`click`, () => {
  renderTaskCards(taskList.slice(cardsContainer.childElementCount, cardsContainer.childElementCount + 8));
});
