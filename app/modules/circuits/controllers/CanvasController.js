import _ from 'lodash';

import Switch from "../models/gates/Switch";
import LineModel from "../models/LineModel";
import And from '../models/gates/And';

import { AND, SWITCH } from '../constants/gates';

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
    console.log('xy: ', xy);
    
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
}