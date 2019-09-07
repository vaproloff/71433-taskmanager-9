import SearchResult from '../components/search-result';
import SearchResultInfo from '../components/search-result-info';
import TaskListController from './task-list-controller';
import {Position, renderElement} from '../utils';
import SearchResultGroup from '../components/search-result-group';
import SearchResultTasksContainer from '../components/search-result-tasks-container';
import moment from 'moment';
import SearchResultNoTasks from '../components/search-result-no-tasks';

class SearchController {
  constructor(container, search, onBackButtonClick, onDataChange, flatpickrs) {
    this._container = container;
    this._search = search;
    this._onBackButtonClick = onBackButtonClick;
    this._searchResult = new SearchResult();
    this._searchResultInfo = new SearchResultInfo();
    this._searchResultGroup = new SearchResultGroup();
    this._searchResultTasksContainer = new SearchResultTasksContainer();
    this._searchResultNoTasks = new SearchResultNoTasks();
    this._tasks = [];

    this._taskListController = new TaskListController(this._searchResultTasksContainer, onDataChange, flatpickrs);

    this._init();
  }

  _init() {
    renderElement(this._container, Position.BEFOREEND, this._searchResult.getElement());
    renderElement(this._searchResult.getElement(), Position.BEFOREEND, this._searchResultGroup.getElement());
    renderElement(this._searchResultGroup.getElement(), Position.AFTERBEGIN, this._searchResultInfo.getElement());
    renderElement(this._searchResultGroup.getElement(), Position.BEFOREEND, this._searchResultTasksContainer.getElement());

    this._searchResult.getElement().querySelector(`.result__back`).addEventListener(`click`, () => {
      this._onBackButtonClick();
    });

    const onSearchKeyup = (evt) => {
      const {value} = evt.target;
      let tasksFound;
      if (value.length >= 3) {
        switch (value[0]) {
          case `#`:
            tasksFound = this._tasks.filter((task) => {
              return task.tags.includes(value.slice(1).toLowerCase());
            });
            break;
          case `D`:
            tasksFound = this._tasks.filter((task) => {
              return moment(task.dueDate).format(`DD.MM.YYYY`) === value.slice(1);
            });
            break;
          default:
            tasksFound = this._tasks.filter((task) => {
              return task.description.toLowerCase().includes(value.toLowerCase());
            });
        }

        if (!tasksFound.length) {
          renderElement(this._searchResultTasksContainer.getElement(), Position.BEFOREBEGIN, this._searchResultNoTasks.getElement());
        } else {
          this._searchResultNoTasks.removeElement();
        }

        this._showSearchResult(value, tasksFound);
      } else {
        this._showSearchResult(value, this._tasks);
      }
    };

    let searchDebounceTimeout;

    this._search.getElement().querySelector(`input`).addEventListener(`keyup`, (evt) => {
      clearTimeout(searchDebounceTimeout);
      searchDebounceTimeout = setTimeout(() => {
        onSearchKeyup(evt);
      }, 500);
    });
  }

  _showSearchResult(text, tasks) {
    if (this._searchResultInfo) {
      this._searchResultInfo.removeElement();
    }

    this._searchResultInfo = new SearchResultInfo(text, tasks.length);

    renderElement(this._searchResultGroup.getElement(), Position.AFTERBEGIN, this._searchResultInfo.getElement());
    this._taskListController.setTasks(tasks);
  }

  show(tasks) {
    this._tasks = tasks;

    if (this._searchResult.getElement().classList.contains(`visually-hidden`)) {
      this._showSearchResult(``, this._tasks);
      this._searchResult.getElement().classList.remove(`visually-hidden`);
    }
  }

  hide() {
    this._search.getElement().querySelector(`input`).value = ``;
    this._searchResult.getElement().classList.add(`visually-hidden`);
  }
}

export default SearchController;
