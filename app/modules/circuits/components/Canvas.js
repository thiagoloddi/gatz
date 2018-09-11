import React, { Component } from 'react'
import DrawingArea from '../models/DrawingArea';

export default class Canvas extends Component {

  constructor(props) {
    super(props);

    this.drawingArea = new DrawingArea();
  }

  componentDidMount() {
    const canvas = this.refs.myCanvas;
    canvas.height = this.refs.canvasContainer.clientHeight;
    canvas.width = this.refs.canvasContainer.clientWidth;

    this.drawingArea.setCanvas(canvas);
    this.drawingArea.addScrollListener();
    this.drawingArea.clear();
    
  }

  render() {
    return (
      <div
        ref="canvasContainer"
        draggable={true}
        onDragStart={this.drawingArea.onDragStart}
        onDragOver={this.drawingArea.onDrag}
        className="canvas-container" >
        <canvas
          className="canvas"
          ref="myCanvas"
          >
        </canvas>
      </div>
    );
  }
}
