import {returnMenuHtml} from './components/menu.js';
import {returnSearchHtml} from './components/search.js';
import {returnFiltersHtml} from './components/filters.js';
import {returnCardsSectionHtml} from './components/cards-section.js';
import {returnTaskCardHtml} from './components/task-card.js';
import {returnTaskEditCardHtml} from './components/task-edit-card.js';
import {returnLoadMoreButtonHtml} from './components/loadmore-button.js';

// Функция, отрисовывающая разметку в заданный контейнер
const renderNode = (container, html) => {
  const node = document.createElement(`div`);
  node.innerHTML = html;
  container.appendChild(node.children[0]);
};

const mainContainer = document.querySelector(`main.main`);

// Подготовка и наполнение контейнера для контента
const mainContentFragment = document.createDocumentFragment();
const menuContainer = document.querySelector(`.main__control`);
mainContentFragment.appendChild(menuContainer);
renderNode(menuContainer, returnMenuHtml());
renderNode(mainContentFragment, returnSearchHtml());
renderNode(mainContentFragment, returnFiltersHtml());
renderNode(mainContentFragment, returnCardsSectionHtml());
const cardsContainer = mainContentFragment.querySelector(`.board__tasks`);
renderNode(cardsContainer, returnTaskEditCardHtml());
renderNode(cardsContainer, returnTaskCardHtml());
renderNode(cardsContainer, returnTaskCardHtml());
renderNode(cardsContainer, returnTaskCardHtml());
renderNode(cardsContainer, returnLoadMoreButtonHtml());

// Добавление контейнера в DOM
mainContainer.appendChild(mainContentFragment);
