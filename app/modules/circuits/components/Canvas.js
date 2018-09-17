import React, { Component } from 'react'
import DrawingArea from '../models/DrawingArea';
import _ from 'lodash';

import * as xy from '../utils/coords';
import Gate from './Gate';
import constants from '../utils/constants';
import BottomControl from './BottomControl';
import GateModel from '../models/GateModel';
import Coordinates from '../models/Coordinates';
import CanvasController from '../controllers/CanvasController';
import LineModel from '../models/LineModel';
import Line from './Line';
const {
  MENU_WIDTH,
  PADDING
} = constants;

export default class Canvas extends Component {

  constructor(props) {
    super(props);

    this.drawingArea = new DrawingArea();
    this.coords = new Coordinates(MENU_WIDTH, PADDING);
    this.gates = [];
    this.lines = [];

    this.state = {
      elements: [],
      c: { x: 0, y: 0 },
      drawingLine: false
    };

    this.callback = this.callback.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onGateDrag = this.onGateDrag.bind(this);
    this.onGateDragStart = this.onGateDragStart.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onTerminalClick = this.onTerminalClick.bind(this);
  }

  componentDidMount() {
    const { canvasContainer, canvas, viewport } = this.refs;
    this.coords.setViewport(viewport);
    
    this.drawingArea.setCanvas(canvas);
    this.drawingArea.setCanvasContainer(canvasContainer);
    this.drawingArea.setSize(PADDING);
    this.drawingArea.updateSize();
    this.drawingArea.clear();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.zoom != nextProps.zoom) {
      this.updateZoom(nextProps.zoom);
    }
  }

  updateZoom(zoom) {
    this.drawingArea.updateSize(zoom);
    this.drawingArea.clear(zoom);

    const gates = this.gates.map(gate =>  gate.toStateObject(zoom));
    const lines = this.lines.map(line => line.toStateObject(zoom));
    
    this.setState({ elements: gates.concat(lines) });

  }

  onCanvasGateClick(e) {
    // 
  }

  onGateDragStart(e) {
    CanvasController.dragGateStart.apply(this, [e]);
  }

  onGateDrag(e) {
    CanvasController.dragGate.apply(this, [e, this.callback]);
  }

  onCanvasClick(e) {
    console.log('onCanvasClick');
    if(this.props.selected) {
      CanvasController.createGate.apply(this, [e, this.callback]);
      this.props.onGateClick();
    }

    if(this.state.drawingLine) {
      this.setState({ drawingLine: null });
    }
  }

  async onTerminalClick({ terminal, gateId }) {
    if(!this.state.drawingLine) {
      CanvasController.createLine.apply(this, [{ terminal, gateId }, this.callback]);
    } else {
      CanvasController.finishLine.apply(this, [{ terminal, gateId }, this.callback]);
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

  renderLine({ id, segments, lines }) {
    return (
      <Line key={id} id={id} segments={segments} lines={lines} />
    );
  }

  callback(state) {
    this.setState(state);
  }

  onHover(e) {
    const { pageX, pageY } = e;
    const c = this.coords.windowToCanvas(pageX, pageY, this.props.zoom);
    this.setState({ c });

    const { drawingLine, elements } = this.state;
    if(drawingLine) {
      const { zoom } = this.props;
      drawingLine.setEndPosition(c);
      this.setState({ 
        elements: elements.map(el => el.id == drawingLine.id ? drawingLine.toStateObject(zoom) : el)
      });
    }
  }

  renderGate({ id, style, coords }) {
    const { zoom } = this.props;
    return (
      <Gate 
        isCanvas
        id={id}
        key={id}
        style={style}
        coords={coords}
        zoom={zoom}
        onClick={this.onCanvasGateClick}
        onDragStart={this.onGateDragStart}
        onDrag={this.onGateDrag}
        onTerminalClick={this.onTerminalClick}
      />
    );
  }

  render() {
    const { c } = this.state;
    return (
      <div className="canvas-viewport" ref="viewport">
        <div ref="canvasContainer" className="canvas-container" onMouseMove={this.onHover}>
          <div className="drawing-area">
            <canvas
              onMouseDown={this.onCanvasClick}
              className="canvas"
              ref="canvas"
              >
            </canvas>
            {this.renderElements()}
          </div>
          <BottomControl x={c.x.toFixed(0)} y={c.y.toFixed(0)} zoom={this.props.zoom} onZoom={this.props.onZoom}/>
        </div>
      </div>
    );
  }
}
