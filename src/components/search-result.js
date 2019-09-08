import AbstractComponent from './abstract-component';

class SearchResult extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
    <section class="result container visually-hidden">
      <button class="result__back">back</button>

    </section>`;
  }
}

export default SearchResult;
