import React, { PureComponent } from 'react'
import draws from '../draws';
import constants from '../utils/constants';
const { TERMINAL_RADIUS } = constants;
import { TERMINALS } from '../constants/gates/and.constants';

export default class Gate extends PureComponent {

  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
  }

  onDragStart(e) {
    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
    if(this.props.onDragStart) this.props.onDragStart(e);
  }

  renderTerminals() {
      const { terminals } = this;
      const { zoom, id, onTerminalClick = () => {} } = this.props;
      const r = TERMINAL_RADIUS * zoom;
      return TERMINALS.map(({ NAME, X, Y }, i) => 
        <div key={i} onClick={onTerminalClick.bind(null, { terminal: NAME, gateId: id })} style={{ borderWidth: r + 'px', left: X * zoom - r + "px", top: Y * zoom - r + "px" }} className="terminal"></div>
      );
  }

  render() {
    const { style, id, onClick, onDrag, isCanvas, elType } = this.props;

    return (
        <div 
          className={`gate ${isCanvas ? '-canvas' : ''}`} 
          draggable={id !== undefined}
          onDrag={onDrag} 
          onDragStart={this.onDragStart}
          onClick={onClick} id={id} 
          style={style}
          ref="container">
    
          <img draggable={false} src={`icons/${elType}.svg`} />
          {this.renderTerminals()}
        </div>
    );
  }
}