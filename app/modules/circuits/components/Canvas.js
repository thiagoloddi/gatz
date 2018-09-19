import React, { Component } from 'react'
import DrawingArea from '../models/DrawingArea';

import Element from './Element';
import constants from '../utils/constants';
import BottomControl from './BottomControl';
import Coordinates from '../models/Coordinates';
import CanvasController from '../controllers/CanvasController';
import Line from './Line';
import { SWITCH } from '../constants/gates';
import PowerSource from './PowerSource';
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
    this.onCanvasGateClick = this.onCanvasGateClick.bind(this)
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
    this.updateElements(zoom);

  }

  onCanvasGateClick(e) {
    const { id } = e.currentTarget;
    const gate = _.find(this.gates, { id });
    const shouldUpdate = gate.onGateClick();
    if(shouldUpdate)
      this.updateElements(this.props.zoom);
  }

  updateElements(zoom, ids) {
    const elements = this.gates.concat(this.lines).map(m =>
      !ids || ids.includes(m.id) ? m.toStateObject(zoom) : _.find(this.state.elements, { id: m.id }) || m.toStateObject(zoom) 
    );
    this.setState({ elements });
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

  onCanvasClick(e) {
    if(this.props.selected) {
      CanvasController.createGate.apply(this, [e, this.props.selected, this.callback]);
      this.props.onGateClick();
    }

    if(this.state.drawingLine) {
      this.setState({ drawingLine: null });
    }
  }

  onTerminalClick({ terminal, gateId }, e) {
    e.stopPropagation();
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
    const { zoom } = this.props;
    const props =  {
      id,
      style,
      coords,
      zoom,
      gateType,
      lines,
      state,
      key: id,
      isCanvas: true,
      onClick: this.onCanvasGateClick,
      onDragStart: this.onGateDragStart,
      onDrag: this.onGateDrag,
      onTerminalClick: this.onTerminalClick,
    };

    switch(gateType) {
      // case SWITCH: return <PowerSource {...props} on={on}/>;
      default: return <Element {...props} />;
    }
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
