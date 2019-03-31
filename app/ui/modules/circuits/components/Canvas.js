import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { compose } from 'redux';

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

import { 
  setViewportPositionAction,
  setZoomAction
 } from '../../../actions/viewport.actions';

import { addElementAction, updateElementAction, setDrawingLineAction, setElementsAction } from '../../../actions/element.actions';
import ViewportController from '../../../../controllers/ViewportController';
import GateController from '../../../../controllers/GateController';

const style = {
  canvas: ({ position: { x, y, }, zoom }) => ({
    top: `${-1 * y}px`,
    left: `${-1 * x}px`,
    height: CANVAS_DIMEN * zoom,
    width: CANVAS_DIMEN * zoom,
    position: 'absolute',
    border: '1px solid #d6d6d6',
    backgroundColor: 'white',
    boxSizing: 'content-box'
  })
}

class Canvas extends Component {

  constructor(props) {
    super(props);

    this.coords = new Coordinates();

    this.onCanvasClick = this.onCanvasClick.bind(this);
    this.onHover = this.onHover.bind(this);
    
    this.onCanvasDragStart = this.onCanvasDragStart.bind(this);
    this.onCanvasDrag = this.onCanvasDrag.bind(this);

    this.controller = new CanvasController(this);

    this.viewportController = new ViewportController(props);
    this.gateController = new GateController(props);
  }

  onCanvasDragStart(e) {
    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
    this.viewportController.startViewportDrag(e);
  }
  
  onCanvasDrag(e) {
    this.viewportController.dragViewport(e);
  }

  onCanvasClick(e) {
    const { props } = this;
    if(props.newElement) {
      this.gateController.createGate(props.newElement, e);
    }

    if(props.drawingLine) {
      props.setDrawingLineAction(null);
    }

    if(props.selected.length && !props.drawingLine) {
      props.clearSelectionAction();
    }
  }
  
  componentDidMount() {

    // Set viewport offset
    const { offsetLeft, offsetTop } = this.refs.canvas.parentNode;
    this.viewportController.boundViewportToCanvas(offsetLeft, offsetTop);

    // this.controller.setInitCoords();
    
    this.refs.viewport.addEventListener("wheel", e => {
      this.viewportController.updateZoom(e.deltaY);
    });
    
    document.addEventListener('keydown', e => {
      const DELETE = 46;
      console.log(e.keyCode);
      switch(e.keyCode) {
        case DELETE: this.controller.deleteItems(); break;
      }
    });
  }

  onHover(e) {
    // const { pageX, pageY } = e;
    // const c = this.props.coords.windowToCanvas(pageX, pageY, this.props.zoom);
    // this.setState({ c });

    // let { drawingLine } = this.props;
    // if(drawingLine) {
    //   drawingLine = _.cloneDeep(drawingLine);
    //   drawingLine.setEndPosition(c);
    //   this.props.updateElementAction(drawingLine);
    // }
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

    switch(gate.type) {
      // case SWITCH: return <PowerSource {...props} on={on}/>;
      default: return <Gate {...gate} key={gate.id} />;
    }
  }

  getCanvasStyle() {
    const { position: { x, y }, zoom } = this.props;
    console.log('x, y: ', x, y);
    return {
      top: `${PADDING - y}px`,
      left: `${PADDING - x}px`,
      height: CANVAS_DIMEN * zoom,
      width: CANVAS_DIMEN * zoom
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div ref="viewport" className="canvas-viewport">
        <div
          draggable
          ref="canvas"
          className={classes.canvas}
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

export default compose(
  connect(({ window, elements, viewport }) => {
    return {
      position: viewport.position,
      newElement: elements.new,
      zoom: viewport.zoom,
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
    setDrawingLineAction,
    setElementsAction,

    setViewportPositionAction,
    setZoomAction
  }),
  injectSheet(style)
)(Canvas);