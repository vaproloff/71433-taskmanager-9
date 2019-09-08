import AbstractComponent from './abstract-component';

class SearchResultTasksContainer extends AbstractComponent {
  constructor() {
    super();
  }

  clearTasks() {
    if (this._element) {
      this._element.innerHTML = ``;
    }
  }

  getTemplate() {
    return `
    <div class="result__cards"></div>`;
  }
}

export default SearchResultTasksContainer;
