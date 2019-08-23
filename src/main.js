import {filters, tasks} from './data';
import Controller from './controller';

const mainContainer = document.querySelector(`main.main`);
const boardController = new Controller(mainContainer, filters, tasks);
boardController.init();
