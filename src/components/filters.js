import {createElement} from "../utils";

const DEFAULT_FILTER = `All`;

class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
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
