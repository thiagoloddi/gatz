import Controller from "./Controller";

export default class GateController extends Controller {

  startGateDrag(e) {
    const { coords, zoom, selected, elements } = this.view.props;
    const { pageX, pageY } = e;
    
    const list = selected.length ? selected : [e.target.id];

    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
    e.stopPropagation();
    
    list.forEach(id => {
      const el = _.cloneDeep(_.find(elements, { id }));
      el.setClickPositionOffset(coords.windowToCanvas(pageX, pageY, zoom));
      this.view.props.updateElementAction(el);
    });
  }

  dragGate(e) {
    const { pageX, pageY } = e;
    if(!pageX && !pageY) return;

    const { coords, zoom, selected, elements } = this.view.props;
    const cachedLines = {};

    const list = selected.length ? selected : [e.target.id];

    list.forEach(id => {
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

  selectGate(id) {
    this.view.props.addElementToSelectionAction(id);
  }
}