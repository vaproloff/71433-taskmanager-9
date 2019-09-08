import AbstractComponent from './abstract-component';

class SearchResultGroup extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
    <section class="result__group">
      <div class="result__cards"></div>
    </section>`;
  }
}

export default SearchResultGroup;
