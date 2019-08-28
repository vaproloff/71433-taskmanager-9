import {filters, tasks} from './data';
import BoardController from './controllers/board-controller';

const mainContainer = document.querySelector(`main.main`);
const boardController = new BoardController(mainContainer, filters, tasks);
boardController.init();
