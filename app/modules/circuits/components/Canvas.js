import React, { Component } from 'react'

import Gate from './Gate';
import Coordinates from '../models/Coordinates';
import CanvasController from '../controllers/CanvasController';
import Line from './Line';
import { PADDING, CANVAS_DIMEN } from '../constants/globals.constants';

import { connect } from 'react-redux';
import { selectItemAction } from '../../../actions/toolbox.actions';
import {
  setCanvasPosition,
  updateZoomAction,
  selectElementAction,
  clearSelectionAction,
  addElementToSelectionAction
} from '../../../actions/window.actions';

import { addElementAction, updateElementAction } from '../../../actions/element.actions';

class Canvas extends Component {

  constructor(props) {
    super(props);

    this.coords = new Coordinates();
    this.gates = [];
    this.lines = [];

    this.elements = [];

    this.state = {
      elements: [],
      drawingLine: false
    };

    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onGateDrag = this.onGateDrag.bind(this);
    this.onGateDragStart = this.onGateDragStart.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onTerminalClick = this.onTerminalClick.bind(this);
    
    
    this.onCanvasDragStart = this.onCanvasDragStart.bind(this);
    this.onCanvasDrag = this.onCanvasDrag.bind(this);
    this.onGateMouseDown = this.onGateMouseDown.bind(this);
    this.onCanvasGateClick = this.onCanvasGateClick.bind(this);

    this.controller = new CanvasController(this);
  }

  onCanvasDragStart(e) {
    const { pageX, pageY } = e;
    const { x, y } = this.props.position;
    this.coords.setDragStart(pageX, pageY);
    this.coords.setInitialPosition(x, y);
    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
  }
  
  onCanvasDrag(e) {
    const { pageX, pageY } = e;
    const { dragStart, initialPosition } = this.coords;
    if(pageX && pageY) {
      const x = dragStart.x - pageX + initialPosition.x;
      const y = dragStart.y - pageY + initialPosition.y;

      this.props.setCanvasPosition(x, y);
      this.coords.setCanvasPosition(x, y);
    }
  }

  onCanvasClick(e) {
    const { controller, props, state } = this;
    console.log('canvas click', state.drawingLine);
    if(props.newElement) {
      props.selectItemAction(null);
      const gate = controller.createGate(e, props.newElement);
      props.addElementAction(gate);
      // this.updateView(props.zoom, [gate.id]);
    }

    if(state.drawingLine) {
      this.setState({ drawingLine: null });
    }

    if(props.selected.length && !state.drawingLine) {
      props.clearSelectionAction();
    }
  }

  onCanvasGateClick(e) {
    e.stopPropagation();  
  }

  onGateMouseDown(e) {
    e.stopPropagation();
    const { id } = e.currentTarget;

    if(e.ctrlKey) {
      this.props.addElementToSelectionAction(id);
    }
  }
  
  componentDidMount() {
    const { canvas, viewport } = this.refs;
    this.coords.setCanvasOffset(canvas);
    viewport.addEventListener("wheel", this.controller.updateZoom);
  }

  onHover(e) {
    const { pageX, pageY } = e;
    const c = this.coords.windowToCanvas(pageX, pageY, this.props.zoom);
    this.setState({ c });

    let { drawingLine } = this.state;
    if(drawingLine) {
      drawingLine = _.cloneDeep(drawingLine);
      drawingLine.setEndPosition(c);
      this.props.updateElementAction(drawingLine);
    }
  }

  onGateDragStart(e) {
    this.controller.dragGateStart(e);
  }

  onGateDrag(e) {
    this.controller.dragGate(e);
  }

  onTerminalClick({ terminal, gateId }, e) {
    console.log('terminal click', this.state.drawingLine);
    e.stopPropagation();
    // this.props.clearSelectionAction();
    if(!this.state.drawingLine) {
      this.controller.createLine({ terminal, gateId });
    } else {
      this.controller.finishLine({ terminal, gateId });
    }
  }

  renderElements() {
    return this.props.elements.map(el => {
      switch(el.category) {
        case 'GATE': return this.renderGate(el);
        case 'LINE': return this.renderLine(el);
      }
    });
  }

  renderLine(line) {
    const { zoom } = this.props;
    return (
      <Line key={line.id} line={line} zoom={zoom}/>
    );
  }

  renderGate(gate) {
    const { zoom, selected } = this.props;
    const props =  {
      gate,
      zoom,
      type: gate.type,
      key: gate.id,
      selected: selected.includes(gate.id),
      isCanvas: true,
      onDragStart: this.onGateDragStart,
      onDrag: this.onGateDrag,
      onTerminalClick: this.onTerminalClick,
      onMouseDown: this.onGateMouseDown,
      onClick: this.onCanvasGateClick
    };

    switch(gate.type) {
      // case SWITCH: return <PowerSource {...props} on={on}/>;
      default: return <Gate {...props} />;
    }
  }

  getCanvasStyle() {
    const { position: { x, y }, zoom } = this.props;
    return {
      top: `${PADDING - y}px`,
      left: `${PADDING - x}px`,
      height: CANVAS_DIMEN * zoom,
      width: CANVAS_DIMEN * zoom
    }
  }

  render() {
    return (
      <div ref="viewport" className="canvas-viewport">
        <div
          draggable
          ref="canvas"
          className="drawing-area"
          style={this.getCanvasStyle()}
          onDragStart={this.onCanvasDragStart}
          onDrag={this.onCanvasDrag}
          onClick={this.onCanvasClick}
          onMouseMove={this.onHover}>
          {this.renderElements()}
        </div>
        {/* <BottomControl x={c.x.toFixed(0)} y={c.y.toFixed(0)} zoom={this.props.zoom} onZoom={this.props.onZoom}/> */}
      </div>
    );
  }
}

export default connect(({ window, toolbox, elements }) => {
  return {
    position: window.canvasPosition,
    newElement: toolbox.selected,
    zoom: window.zoom,
    selected: window.selected,
    elements: elements.all
  };
}, {
  selectItemAction,
  setCanvasPosition,
  updateZoomAction,
  selectElementAction,
  clearSelectionAction,
  addElementAction,
  addElementToSelectionAction,
  updateElementAction
})(Canvas);