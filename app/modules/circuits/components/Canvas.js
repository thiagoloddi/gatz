import React, { Component } from 'react'

import Element from './Element';
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

    this.callback = this.callback.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onGateDrag = this.onGateDrag.bind(this);
    this.onGateDragStart = this.onGateDragStart.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onTerminalClick = this.onTerminalClick.bind(this);
    
    
    this.onCanvasDragStart = this.onCanvasDragStart.bind(this);
    this.onCanvasDrag = this.onCanvasDrag.bind(this);
    this.onGateMouseDown = this.onGateMouseDown.bind(this);
    this.onCanvasGateClick = this.onCanvasGateClick.bind(this);
    this.onGateMouseUp = this.onGateMouseUp.bind(this);
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
    if(this.props.newElement) {
      
      CanvasController.createGate.apply(this, [e, this.props.newElement]);
      this.props.selectItemAction(null);
    }

    if(this.state.drawingLine) {
      this.setState({ drawingLine: null });
    }

    if(this.props.selected.length && !this.state.drawingLine) {
      this.props.clearSelectionAction();
    }
  }

  onCanvasGateClick(e) {
    e.stopPropagation();  
  }

  onGateMouseDown(e) {
    e.stopPropagation();
    const { id } = e.currentTarget;

    switch(true) {
      case e.ctrlKey: this.props.addElementToSelectionAction(id); break;
      default: 
        if(this.props.selected.length < 2)
          this.props.selectElementAction(id); break;
    }
  }

  onGateMouseUp(e) {
    const { id } = e.currentTarget;
    if(!e.ctrlKey)
      this.props.selectElementAction(id);
  }
  
  componentDidMount() {
    const { canvas, viewport } = this.refs;
    this.coords.setCanvasOffset(canvas);
    viewport.addEventListener("wheel", CanvasController.updateZoom.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.zoom != nextProps.zoom) {
      this.updateZoom(nextProps.zoom);
    }
  }

  updateZoom(zoom) {
    this.updateElements(zoom);
  }

  updateElements(zoom, ids) {
    const el = this.elements.map(m =>
      !ids || ids.includes(m.id) ? m.toStateObject(zoom) : _.find(this.state.elements, { id: m.id }) || m.toStateObject(zoom) 
    )

    // console.log(el);
    this.setState({ elements: el });
  }

  onHover(e) {
    const { pageX, pageY } = e;
    const c = this.coords.windowToCanvas(pageX, pageY, this.props.zoom);
    this.setState({ c });

    const { drawingLine } = this.state;
    if(drawingLine) {
      const { zoom } = this.props;
      drawingLine.setEndPosition(c);
      this.updateElements(zoom, [drawingLine.id]);
    }
  }

  onGateDragStart(e) {
    CanvasController.dragGateStart.apply(this, [e]);
  }

  onGateDrag(e) {
    CanvasController.dragGate.apply(this, [e, this.callback]);
  }

  onTerminalClick({ terminal, gateId }, e) {
    e.stopPropagation();
    // this.props.clearSelectionAction();
    if(!this.state.drawingLine) {
      CanvasController.createLine.apply(this, [{ terminal, gateId }]);
    } else {
      CanvasController.finishLine.apply(this, [{ terminal, gateId }]);
    }
  }

  renderElements() {
    return this.state.elements.map(el => {
      switch(el.elType) {
        case 'GATE': return this.renderGate(el);
        case 'LINE': return this.renderLine(el);
      }
    });
  }

  renderLine({ id, segments, lines, hasPower }) {
    return (
      <Line key={id} id={id} segments={segments} lines={lines} hasPower={hasPower}/>
    );
  }

  callback(state) {
    this.setState(state);
  }

  renderGate({ id, style, coords, gateType, lines, state }) {
    const { zoom, selected } = this.props;
    const props =  {
      id,
      style,
      coords,
      zoom,
      gateType,
      lines,
      state,
      selected,
      key: id,
      isCanvas: true,
      onDragStart: this.onGateDragStart,
      onDrag: this.onGateDrag,
      onTerminalClick: this.onTerminalClick,
      onMouseDown: this.onGateMouseDown,
      onClick: this.onCanvasGateClick,
      onMouseUp: this.onGateMouseUp
    };

    switch(gateType) {
      // case SWITCH: return <PowerSource {...props} on={on}/>;
      default: return <Element {...props} />;
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
    // console.log(this.state.elements);
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

export default connect(({ window, toolbox }) => {
  return {
    position: window.canvasPosition,
    newElement: toolbox.selected,
    zoom: window.zoom,
    selected: window.selected
  };
}, {
  selectItemAction,
  setCanvasPosition,
  updateZoomAction,
  selectElementAction,
  clearSelectionAction,
  addElementToSelectionAction
})(Canvas);