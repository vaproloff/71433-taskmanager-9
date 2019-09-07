import AbstractComponent from './abstract-component';

class SearchResultInfo extends AbstractComponent {
  constructor(title, count) {
    super();

    this._title = title;
    this._count = count;
  }

  getTemplate() {
    return `
      <h2 class="result__title">
        ${this._title}<span class="result__count">${this._title === `` ? 0 : this._count}</span>
      </h2>`;
  }
}

export default SearchResultInfo;
