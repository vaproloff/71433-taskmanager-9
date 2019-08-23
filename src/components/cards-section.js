import AbstractComponent from './abstract-component';

class CardsSection extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="board container">
      
      </section>`;
  }
}

export default CardsSection;
