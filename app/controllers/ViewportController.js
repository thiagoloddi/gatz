import { engine } from '../';

export default class ViewportController {
  constructor(actions) {
    this.actions = actions;

    this.engine = engine;
  }

  boundViewportToCanvas(xOffset, yOffset) {
    engine.viewport.setCanvasOffset(xOffset, yOffset);

    this.actions.setViewportPositionAction({ ...engine.viewport.position });
  }

  startViewportDrag(pageCoords) {
    const { pageX, pageY } = pageCoords;
    const { position } = this.engine.viewport;
    this.engine.viewport.setDragStart(pageX + position.x, pageY + position.y);
  }

  dragViewport(pageCoords) {
    const { pageX, pageY } = pageCoords;
    const { dragStart } = this.engine.viewport;
    
    if(pageX && pageY) {
      const x = dragStart.x - pageX;
      const y = dragStart.y - pageY;

      this.engine.viewport.setPosition(x, y);
      this.actions.setViewportPositionAction({ x, y });
    }
  }

  updateZoom(deltaY) {
    const step = .1;
    
    let zoom = this.engine.viewport.zoom + (deltaY < 0 ? 1 : -1) * step;
    zoom = Math.min(Math.max(zoom, 0.5), 2);
    this.engine.viewport.setZoom(zoom);
    this.actions.setZoomAction(zoom);
  }
}