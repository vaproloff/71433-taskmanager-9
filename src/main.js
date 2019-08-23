import {filters, tasks} from './data';
import Controller from './controller';

const boardController = new Controller(filters, tasks);
boardController.init();
