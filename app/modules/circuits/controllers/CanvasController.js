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

  createGate(e, selected) {    
    const { coords, props: { zoom } } = this.view;
    const { pageX, pageY } = e;
    const xy = coords.windowToCanvas(pageX, pageY, zoom);
    
    switch(selected) {
      case AND: return new And(xy);
      case SWITCH: return new Switch(xy);
    }
  }

  dragGateStart(e) {
    const { coords, props: { zoom, selected, elements }} = this.view;
    const { pageX, pageY } = e;
    selected.forEach(id => {
      const el = _.cloneDeep(_.find(elements, { id }));
      el.setClickPositionOffset(coords.windowToCanvas(pageX, pageY, zoom));
      this.view.props.updateElementAction(el);
    });
  }

  dragGate(e) {
    const { pageX, pageY } = e;
    if(!pageX && !pageY) return;

    const { coords, props: { zoom, selected, elements }} = this.view;
    const cachedLines = {};

    selected.forEach(id => {
      const gate = _.cloneDeep(_.find(elements, { id }));
      
      gate.updatePosition(coords.windowToCanvas(pageX, pageY, zoom));

      this.view.props.updateElementAction(gate);

      _.forEach(gate.lines, (lineId, terminal) => {
        if(lineId) {
          if(!cachedLines[lineId]) cachedLines[lineId] = _.find(elements, { id: lineId }).clone();
          const line = cachedLines[lineId];
          line.updatePosition(gate.getTerminalCoords(terminal), gate.id);
          this.view.props.updateElementAction(line);
        }
      });
    });
  }

  createLine({ terminal, gateId }) {
      const { elements } = this.view.props;
      const gate = _.cloneDeep(_.find(elements, { id: gateId }));
      const line = new LineModel(gate.id, gate.getTerminalCoords(terminal), terminal);
  
      gate.setTerminalLine(terminal, line.id);
      
      this.view.props.addElementAction(line);
      this.view.props.updateElementAction(gate);
      this.view.setState({ drawingLine: line });
  }

  finishLine({ terminal, gateId }) {
    const { elements } = this.view.props;

    const gate = _.cloneDeep(_.find(elements, { id: gateId }));
    const line = _.cloneDeep(_.find(elements, { id: this.view.state.drawingLine.id }));

    line.setEndGate(gate.id, terminal, gate.getTerminalCoords(terminal));
    gate.setTerminalLine(terminal, line.id);
    
    this.view.props.updateElementAction(gate);
    this.view.props.updateElementAction(line);
    this.view.setState({ drawingLine: null });
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