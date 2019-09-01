import {tasks} from './data';
import BoardController from './controllers/board-controller';

const mainContainer = document.querySelector(`main.main`);
const boardController = new BoardController(mainContainer, tasks);
boardController.init();
