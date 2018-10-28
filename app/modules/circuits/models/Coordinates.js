import { PADDING } from "../constants/globals.constants";

export default class Coordinates {
  constructor() {
    this.canvasPosition = { x: 0, y: 0 };
    this.canvasOffset = null
    this.dragStart = null;
  }

  windowToCanvas(pageX, pageY, zoom) {
    const { canvasOffset, canvasPosition } = this;
    return { 
      x: (pageX - canvasOffset.x + canvasPosition.x) / zoom, 
      y: (pageY - canvasOffset.y + canvasPosition.y) / zoom 
    };
  }

  setInitialPosition(x, y) {
    this.initialPosition = { x, y };
  }

  setDragStart(x, y) {
    this.dragStart = { x, y };
  }

  setCanvasOffset(canvas) {
    const container = canvas.parentNode;

    if(container) {
      this.canvasOffset = {
        x: PADDING + container.offsetLeft,
        y: PADDING + container.offsetTop
      };
    } else {
      throw new Error("Container not found! Check Canvas render method.");
    }
  }

  setCanvasPosition(x, y) {
    this.canvasPosition = { x, y };
  }
}