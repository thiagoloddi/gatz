import uuidv4 from 'uuid/v4';
import CONSTANTS from '../constants/gates';

export default class Element {
  constructor(coords, type, category, id) {
    this.constants = CONSTANTS[type];

    this.id = id || uuidv4();
    this.x = coords.x - this.constants.WIDTH / 2;
    this.y = coords.y - this.constants.HEIGHT / 2;  

    this.type = type;
    this.category = category;
  }
}