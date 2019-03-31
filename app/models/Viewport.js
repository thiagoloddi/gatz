export default class Viewport {
  constructor() {

    this.position = { x: -10, y: -10 };
    this.zoom = 1;
    this.canvasOffset = { x: 0, y: 0 };
    this.dragStart = { x: 0, y: 0 };
  }

  setCanvasOffset(x, y) {
    this.canvasOffset = { x, y };
  }

  setDragStart(x, y) {
    this.dragStart = { x, y };
  }

  setPosition(x, y) {
    this.position = { x, y };
  }

  setZoom(zoom) {
    this.zoom = zoom;
  }
}