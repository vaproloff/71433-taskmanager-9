import AbstractComponent from './abstract-component';

class SearchResultNoTasks extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
    <p class="result__empty">no matches found...</p>`;
  }
}

export default SearchResultNoTasks;
