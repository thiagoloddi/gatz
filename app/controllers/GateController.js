import gateMapper from '../mappers/gate.mapper';
import { engine } from '..';
import { AND } from '../constants/gates';
import And from '../models/gates/And';

export default class GateController {
  constructor(actions) {
    this.actions = actions;

    this.engine = engine;
  }

  createGate(gateType, pageCoords) {
    const { pageX, pageY } = pageCoords;
    const xy = this.engine.viewport.windowToCanvas(pageX, pageY);
    
    // this.view.props.selectItemAction(null);
    
    let gate;
    switch(gateType) {
      case AND: gate = new And(xy); break;
      // case SWITCH: gate = new Switch(xy); break;
    }

    this.engine.addElement(gate);
    this.actions.addElementAction(gateMapper(gate));
  }
}