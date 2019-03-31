import Viewport from './Viewport';

export default class Engine {
  constructor() {

    this.viewport = new Viewport();

    this.elements = [];
  }

  addElement(el) {
    this.elements.push(el);
  }
}