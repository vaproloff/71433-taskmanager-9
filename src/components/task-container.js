import AbstractComponent from './abstract-component';

class TaskContainer extends AbstractComponent {
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
      <div class="board__tasks">
      </div>`;
  }
}

export default TaskContainer;
