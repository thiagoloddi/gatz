export default class GateController {
  constructor(actions) {
    this.actions = actions;
  }

  createGate(gateType, pageCoords) {
    const { pageX, pageY } = pageCoords;
    const xy = coords.windowToCanvas(pageX, pageY, zoom);
    
    this.view.props.selectItemAction(null);
    
    let gate;
    switch(selected) {
      case AND: gate = new And(xy); break;
      case SWITCH: gate = new Switch(xy); break;
    }

    this.view.props.addElementAction(gate);
  }
}