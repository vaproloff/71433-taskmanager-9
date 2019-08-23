import AbstractComponent from './abstract-component';

const DEFAULT_FILTER = `All`;

class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return `
      <section class="main__filter filter container">
        ${this._filters.map((it) => `
          <input
            type="radio"
            id="filter__${it.title}"
            class="filter__input visually-hidden"
            name="filter"
            ${(it.title === DEFAULT_FILTER) ? `checked` : ``} ${!it.count ? `disabled` : ``}
          />
          <label for="filter__${it.title}" class="filter__label">
            ${it.title} <span class="filter__${it.title}-count">${it.count}</span></label
          >`).join(``)}
      </section>`;

  }
}

export default Filter;
