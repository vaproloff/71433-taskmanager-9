import {createElement, unrenderElement} from '../utils';

class TaskContainer {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    unrenderElement(this._element);
    this._element = null;
  }

  getTemplate() {
    return `
      <div class="board__tasks">
      </div>`;
  }
}

export default TaskContainer;
