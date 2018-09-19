import _ from 'lodash';

import GateModel from "../models/GateModel";
import Switch from "../models/gates/Switch";
import constants from '../utils/constants';
import LineModel from "../models/LineModel";

const {
  AND_GATE_HEIGHT,
  AND_GATE_WIDTH
} = constants;

export default class CanvasController {
  static createGate(e, selected, callback) {    
    const { gates, coords, props: { zoom } } = this;
    const { pageX, pageY } = e;
    const xy = coords.windowToCanvas(pageX, pageY, zoom);
    let gate;
    
    switch(selected) {
      case 'switch': gate = new Switch(xy); break;
      default: gate = new GateModel(xy, selected); break;
    }
    
    gates.push(gate);
    this.updateElements(zoom, [gate.id]);
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

  static createLine({ terminal, gateId }) {
      const { zoom } = this.props;
      const gate = _.find(this.gates, { id: gateId });
      const line = new LineModel(gate, terminal);
  
      this.lines.push(line);
      gate.setTerminalLine(terminal, line);
      this.setState({ drawingLine: line });
      this.updateElements(zoom, [line.id, gate.id]);
  
      // const elements = [ ...this.state.elements ];
      // elements.push(line.toStateObject(zoom));
  
      // console.log("createLine", elements);
      // callback({ drawingLine: line, elements });
  }

  static finishLine({ terminal, gateId }) {
    const { zoom } = this.props;
    const gate = _.find(this.gates, { id: gateId });
    const line = _.find(this.lines, { id: this.state.drawingLine.id });
    line.setEndGate(gate, terminal);
    gate.setTerminalLine(terminal, line);
    
    this.setState({ drawingLine: null });
    this.updateElements(zoom, [gate.id, line.id ]);
    // callback({ drawingLine: null, elements: this.state.elements.map(el => 
    //   el.id == this.state.drawingLine.id ? this.state.drawingLine.toStateObject(zoom) : el
    // )});
  }
}