import AbstractComponent from './abstract-component';

class LoadmoreButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
  <button class="load-more" type="button">load more</button>`;
  }
}

export default LoadmoreButton;
