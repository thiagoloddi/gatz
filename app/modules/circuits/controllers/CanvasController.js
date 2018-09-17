import _ from 'lodash';

import GateModel from "../models/GateModel";
import constants from '../utils/constants';
import LineModel from "../models/LineModel";

const {
  AND_GATE_HEIGHT,
  AND_GATE_WIDTH
} = constants;

export default class CanvasController {
  static createGate(e, callback) {    
    const { state, gates, coords, props: { zoom } } = this;
    const { pageX, pageY } = e;
    const elements = [ ...state.elements ];
    const gate = new GateModel(coords.windowToCanvas(pageX, pageY, zoom), { height: AND_GATE_HEIGHT, width: AND_GATE_WIDTH });
    
    gates.push(gate);
    elements.push(gate.toStateObject(zoom));
    callback({ elements });
  }

  static dragGateStart(e) {
    const { gates, coords, props: { zoom }} = this;
    const { pageX, pageY, currentTarget: { id }} = e;
    const el = _.find(gates, { id });
    el.setClickPositionOffset(coords.windowToCanvas(pageX, pageY, zoom));
  }

  static dragGate(e, callback) {
    const { currentTarget: { id }, pageX, pageY } = e;
    if(!pageX && !pageY) return;

    const { gates, state, coords, props: { zoom }} = this;
    const gate = _.find(gates, { id });
    gate.updatePosition(coords.windowToCanvas(pageX, pageY, zoom));

    const elements = state.elements.map(el => {
      if(el.id == e.currentTarget.id && pageX && pageY) {
        return gate.toStateObject(zoom);
      }

      for(let k in gate.lines) {
        if(gate.lines[k] && gate.lines[k].id == el.id)
          return gate.lines[k].toStateObject(zoom);
      }

      return el;
    });
    callback({ elements });
  }

  static createLine({ terminal, gateId }, callback) {
      console.log('createLine');
      const { zoom } = this.props;
      const gate = _.find(this.gates, { id: gateId });
      const line = new LineModel(gate, terminal);
  
      this.lines.push(line);
      gate.setTerminalLine(terminal, line);
  
      const elements = [ ...this.state.elements ];
      elements.push(line.toStateObject(zoom));
  
      callback({ drawingLine: line, elements });
  }

  static finishLine({ terminal, gateId }, callback) {
    const { zoom } = this.props;
    const gate = _.find(this.gates, { id: gateId });
    gate.setTerminalLine(terminal, this.state.drawingLine);
    this.state.drawingLine.setEndGate(gate, terminal);

    callback({ drawingLine: null, elements: this.state.elements.map(el => 
      el.id == this.state.drawingLine.id ? this.state.drawingLine.toStateObject(zoom) : el
    )});
  }
}