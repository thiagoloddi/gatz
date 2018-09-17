import React, { PureComponent } from 'react'
import draws from '../draws';
import constants from '../utils/constants';
const { TERMINAL_RADIUS } = constants;

export default class Element extends PureComponent {

  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate(prevProps) {
    if(this.props.zoom != prevProps.zoom)
      this.updateCanvas();
  }

  updateCanvas() {
    const { refs: { canvas }, props: { elementType }} = this;

    canvas.height = this.refs.container.clientHeight;
    canvas.width = this.refs.container.clientWidth;

    this.gate = draws[elementType](canvas);
    this.forceUpdate();

  }

  onDragStart(e) {
    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
    if(this.props.onDragStart) this.props.onDragStart(e);
  }

  renderTerminals() {
    if(this.gate) {
      const { terminals } = this.gate;
      const { zoom, id, onTerminalClick = () => {} } = this.props;
      const r = TERMINAL_RADIUS * zoom;
      return [
        <div key={0} onClick={onTerminalClick.bind(null, { terminal: 'A', gateId: id })} style={{ borderWidth: r + 'px', left: terminals.A.x - r + "px", top: terminals.A.y - r + "px" }} className="terminal"></div>,
        <div key={1} onClick={onTerminalClick.bind(null, { terminal: 'B', gateId: id })} style={{ borderWidth: r + 'px', left: terminals.B.x - r + "px", top: terminals.B.y - r + "px" }} className="terminal"></div>,
        <div key={2} onClick={onTerminalClick.bind(null, { terminal: 'OUT', gateId: id })} style={{ borderWidth: r + 'px', left: terminals.OUT.x - r + "px", top: terminals.OUT.y - r + "px" }} className="terminal"></div>
      ];
    }
  }

  render() {
    const { style, id, onClick, onDrag, isCanvas, coords } = this.props;

    return (
        <div 
          className={`gate ${isCanvas ? '-canvas' : ''}`} 
          draggable={id !== undefined} 
          onDrag={onDrag} 
          onDragStart={this.onDragStart} 
          onClick={onClick} id={id} 
          style={style}
          ref="container">
          <canvas ref="canvas"></canvas>
          { !coords || <div className="coords">{`${coords.x}, ${coords.y}`}</div>}
          {this.renderTerminals()}
        </div>
    );
  }
}