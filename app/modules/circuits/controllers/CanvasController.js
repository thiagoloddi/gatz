import _ from 'lodash';

import Switch from "../models/gates/Switch";
import And from '../models/gates/And';

import { AND, SWITCH, GATE } from '../constants/gates';
import { LINE } from '../constants/globals.constants';

export default class CanvasController {

  constructor(view) {
    this.view = view;

    this.updateZoom = this.updateZoom.bind(this);
  }

  startCanvasDrag(e) {
    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);

    const { pageX, pageY } = e;
    const { x, y } = this.view.props.position;
    const coords = this.view.props.coords.clone();

    coords.setDragStart(pageX, pageY);
    coords.setInitialPosition(x, y);

    this.view.props.setCoordsAction(coords);
  }

  dragCanvas(e) {
    const { pageX, pageY } = e;
    const { dragStart, initialPosition } = this.view.props.coords;
    if(pageX && pageY) {
      const x = dragStart.x - pageX + initialPosition.x;
      const y = dragStart.y - pageY + initialPosition.y;

      const coords = this.view.props.coords.clone();
      coords.setCanvasPosition(x, y);

      this.view.props.setCanvasPosition(x, y);
      this.view.props.setCoordsAction(coords);
    }
  }

  createGate(e, selected) {    
    const { coords, zoom } = this.view.props;
    const { pageX, pageY } = e;
    const xy = coords.windowToCanvas(pageX, pageY, zoom);
    
    this.view.props.selectItemAction(null);
    
    let gate;
    switch(selected) {
      case AND: gate = new And(xy); break;
      case SWITCH: gate = new Switch(xy); break;
    }

    this.view.props.addElementAction(gate);
  }

  updateZoom(e) {
    const step = .1;
    
    const { deltaY } = e;
    const { view } = this;

    let zoom = view.props.zoom + (deltaY < 0 ? 1 : -1) * step;
    zoom = Math.min(Math.max(zoom, 0.5), 2);
    view.props.updateZoomAction(zoom);
  }

  setInitCoords() {
    const { canvas } = this.view.refs;
    const coords = this.view.props.coords.clone();
    coords.setCanvasOffset(canvas);
    this.view.props.setCoordsAction(coords);
  }

  deleteItems() {
    const { selected, elements } = this.view.props;
    const newElements = this.view.props.elements.filter(e => {
      console.log(e);
      console.log(selected);
      if(selected.includes(e.id)) {
        if(e.category == GATE) {
          _.each(e.lines, lineId => {
            if(lineId) {
              const line = _.find(elements, { id: lineId }).clone();
              line.removeGate(e.id);
              this.view.props.updateElementAction(line);
            }
          });

          return false;
        }
        if(e.category == LINE) {
          if(e.startGate && e.endGate) {
            return !(selected.includes(e.startGate) && selected.includes(e.endGate));
          } else {
            return !(selected.includes(e.startGate) || selected.includes(e.endGate));
          }
        }
      }

      return true;
    });
    console.log(newElements);
    this.view.props.setElementsAction(newElements);
    this.view.props.clearSelectionAction();
  }
}