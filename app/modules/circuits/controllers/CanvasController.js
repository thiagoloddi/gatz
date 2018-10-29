import _ from 'lodash';

import Switch from "../models/gates/Switch";
import LineModel from "../models/LineModel";
import And from '../models/gates/And';

import { AND, SWITCH } from '../constants/gates';

export default class CanvasController {
  static createGate(e, selected) {    
    const { coords, props: { zoom } } = this;
    const { pageX, pageY } = e;
    const xy = coords.windowToCanvas(pageX, pageY, zoom);
    let gate;
    
    switch(selected) {
      case AND: gate = new And(xy); break;
      case SWITCH: gate = new Switch(xy); break;
    }
    
    this.elements.push(gate);
    this.updateElements(zoom, [gate.id]);
  }

  static dragGateStart(e) {
    const { elements, coords, props: { zoom, selected }} = this;
    const { pageX, pageY } = e;

    selected.forEach(id => {
      const el = _.find(elements, { id });
      el.setClickPositionOffset(coords.windowToCanvas(pageX, pageY, zoom));
    });


  }

  static dragGate(e) {
    const { pageX, pageY } = e;
    if(!pageX && !pageY) return;

    const { coords, props: { zoom, selected }} = this;
    selected.forEach(id => {
      const el = _.find(this.elements, { id });
      el.updatePosition(coords.windowToCanvas(pageX, pageY, zoom));
    });

    this.updateElements(zoom);
    // const elements = state.elements.map(el => {
    //   if(el.id == e.currentTarget.id && pageX && pageY) {
    //     return gate.toStateObject(zoom);
    //   }

    //   for(let k in gate.lines) {
    //     if(gate.lines[k] && gate.lines[k].id == el.id)
    //       return gate.lines[k].toStateObject(zoom);
    //   }

    //   return el;
    // });
    // callback({ elements });
  }

  static createLine({ terminal, gateId }) {
      const { zoom } = this.props;
      const gate = _.find(this.elements, { id: gateId });
      const line = new LineModel(gate, terminal);
  
      this.elements.push(line);
      gate.setTerminalLine(terminal, line);
      this.setState({ drawingLine: line });
      this.updateElements(zoom, [line.id, gate.id]);
  }

  static finishLine({ terminal, gateId }) {
    const { zoom } = this.props;
    const gate = _.find(this.elements, { id: gateId });
    const line = _.find(this.elements, { id: this.state.drawingLine.id });
    line.setEndGate(gate, terminal);
    gate.setTerminalLine(terminal, line);
    
    this.setState({ drawingLine: null });
    this.updateElements(zoom, [gate.id, line.id ]);
    // callback({ drawingLine: null, elements: this.state.elements.map(el => 
    //   el.id == this.state.drawingLine.id ? this.state.drawingLine.toStateObject(zoom) : el
    // )});
  }

  static updateZoom(e) {
    const step = .1;
    
    const { deltaY } = e;

    let zoom = this.props.zoom + (deltaY < 0 ? 1 : -1) * step;
    zoom = Math.min(Math.max(zoom, 0.5), 2);

    this.props.updateZoomAction(zoom);
    this.updateElements(zoom);
  }
}