import React, { PureComponent } from 'react'
import c, { SWITCH } from '../constants/gates';
import { TERMINAL_RADIUS } from '../constants/globals.constants';

class Element extends PureComponent {

  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.constants = c[props.gateType];
  }

  componentDidMount() {
    const { HEIGHT, WIDTH } = this.constants;
    this.refs.container.style.width = WIDTH + 'px';
    this.refs.container.style.height = HEIGHT + 'px';
  }
  
  onDragStart(e) {
    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
    if(this.props.onDragStart) this.props.onDragStart(e);
  }

  renderTerminals() {
    if(this.props.isCanvas) {
      const { zoom, id, onTerminalClick = () => {}, lines, state } = this.props;
      const r = TERMINAL_RADIUS * zoom;
      return this.constants.TERMINALS.map(({ NAME, X, Y }, i) => 
        <div className={`terminal ${lines[NAME] ? '-connected' : ''} ${state[NAME] ? '-power' : ''}`} key={i} onClick={onTerminalClick.bind(null, { terminal: NAME, gateId: id })} style={{ borderWidth: r + 'px', left: X * zoom - r + "px", top: Y * zoom - r + "px" }}></div>
      );
    }
  }

  getIconName() {
    const { gateType, state: { OUT } } = this.props;
    switch(gateType) {
      case 'switch': return gateType + (OUT ? '-on' : '-off');
      default: return gateType;
    }
  }

  render() {
    const { style, id, onClick, onDrag, isCanvas } = this.props;
    return (
        <div 
          className={`gate ${isCanvas ? '-canvas' : ''}`} 
          draggable={id !== undefined}
          onDrag={onDrag}
          onDragStart={this.onDragStart}
          onClick={onClick} 
          id={id} 
          style={style}
          ref="container">
          <img draggable={false} src={`icons/${this.getIconName()}.svg`} />
          {this.renderTerminals()}
        </div>
    );
  }
}

Element.defaultProps = {
  state: {}
}

export default Element;