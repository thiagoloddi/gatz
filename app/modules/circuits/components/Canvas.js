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
  addElementToSelectionAction,
  setCoordsAction
} from '../../../actions/window.actions';

import { addElementAction, updateElementAction, setDrawingLineAction } from '../../../actions/element.actions';

class Canvas extends Component {

  constructor(props) {
    super(props);

    this.coords = new Coordinates();

    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onHover = this.onHover.bind(this);
    
    this.onCanvasDragStart = this.onCanvasDragStart.bind(this);
    this.onCanvasDrag = this.onCanvasDrag.bind(this);

    this.controller = new CanvasController(this);
  }

  onCanvasDragStart(e) {
    this.controller.startCanvasDrag(e);
  }
  
  onCanvasDrag(e) {
    this.controller.dragCanvas(e);
  }

  onCanvasClick(e) {
    const { controller, props } = this;
    if(props.newElement) {
      controller.createGate(e, props.newElement);
    }

    if(props.drawingLine) {
      props.setDrawingLineAction(null);
    }

    if(props.selected.length && !props.drawingLine) {
      props.clearSelectionAction();
    }
  }
  
  componentDidMount() {
    const { canvas, viewport } = this.refs;
    const coords = this.props.coords.clone();
    coords.setCanvasOffset(canvas);
    this.props.setCoordsAction(coords);
    viewport.addEventListener("wheel", this.controller.updateZoom);
  }

  onHover(e) {
    const { pageX, pageY } = e;
    const c = this.props.coords.windowToCanvas(pageX, pageY, this.props.zoom);
    this.setState({ c });

    let { drawingLine } = this.props;
    if(drawingLine) {
      drawingLine = _.cloneDeep(drawingLine);
      drawingLine.setEndPosition(c);
      this.props.updateElementAction(drawingLine);
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
    const props =  {
      gate,
      type: gate.type,
      key: gate.id,
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
    elements: elements.all,
    coords: window.coords,
    drawingLine: elements.drawingLine
  };
}, {
  selectItemAction,
  setCanvasPosition,
  updateZoomAction,
  selectElementAction,
  clearSelectionAction,
  addElementAction,
  addElementToSelectionAction,
  updateElementAction,
  setCoordsAction,
  setDrawingLineAction
})(Canvas);