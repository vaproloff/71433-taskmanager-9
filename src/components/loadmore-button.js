import {createElement} from "../utils";

class LoadmoreButton {
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
  <button class="load-more" type="button">load more</button>`;
  }
}

export default LoadmoreButton;
