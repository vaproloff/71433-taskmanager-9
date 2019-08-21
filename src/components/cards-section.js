import {createElement} from '../utils';

class CardsSection {
  constructor() {
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
      <section class="board container">
      
      </section>`;
  }
}

export default CardsSection;
