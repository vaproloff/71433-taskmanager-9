import AbstractComponent from './abstract-component';

class NoTasksMessage extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
  <p class="board__no-tasks">
    Congratulations, all tasks were completed! To create a new click on
    «add new task» button.
  </p>`;
  }
}

export default NoTasksMessage;
