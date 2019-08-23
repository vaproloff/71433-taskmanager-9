import AbstractComponent from './abstract-component';

class TaskContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="board__tasks">
      </div>`;
  }
}

export default TaskContainer;
