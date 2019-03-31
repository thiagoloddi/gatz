import Controller from "./Controller";
import LineModel from "../models/LineModel";

export default class TerminalController extends Controller {
  createLine(terminal, gateId) {
    const { elements } = this.view.props;
    const gate = _.cloneDeep(_.find(elements, { id: gateId }));
    const line = new LineModel(gate.id, gate.getTerminalCoords(terminal), terminal);

    gate.setTerminalLine(terminal, line.id);
    
    this.view.props.addElementAction(line);
    this.view.props.updateElementAction(gate);
    this.view.props.setDrawingLineAction(line);
  }

  finishLine(terminal, gateId) {
    const { elements } = this.view.props;

    const gate = _.cloneDeep(_.find(elements, { id: gateId }));
    const line = _.cloneDeep(_.find(elements, { id: this.view.props.drawingLine.id }));

    line.setEndGate(gate.id, terminal, gate.getTerminalCoords(terminal));
    gate.setTerminalLine(terminal, line.id);
    
    this.view.props.updateElementAction(gate);
    this.view.props.updateElementAction(line);
    this.view.props.setDrawingLineAction(null);
  }
}