import React, { PureComponent } from 'react'
import injectSheet from 'react-jss';

import c from '../constants/gates';
import Terminal from './Terminal';

const style = {
  gate: ({ gate, zoom }) => {
    if(gate) {
      const { x, y, constants: { WIDTH, HEIGHT }} = gate;
      return {
        position: 'absolute',
        height: Math.round(HEIGHT * zoom),
        width: Math.round(WIDTH * zoom),
        left: Math.round(x * zoom),
        top: Math.round(y * zoom)
      };
    }
  },
  gateImg: {
    height: '100%',
    width: '100%'
  }
};

class Gate extends PureComponent {

  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.constants = c[props.type];
  }
  
  onDragStart(e) {
    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
    e.stopPropagation();
    if(this.props.onDragStart) this.props.onDragStart(e);
  }

  renderTerminals() {
    if(this.props.isCanvas) {
      const { zoom, id, onTerminalClick = () => {}} = this.props;

      return this.constants.TERMINALS.map(({ NAME, X, Y }) => {
        const position = { 
          x: X,
          y: Y
        };

        return (
          <Terminal
            position={position}
            zoom={zoom}
            id={id}
            onTerminalClick={onTerminalClick.bind(null, { terminal: NAME, gateId: id })}
          />
        );
      }
      );
    }
  }

  getIconName() {
    const { type, state: { OUT } } = this.props;
    switch(type) {
      case 'switch': return type + (OUT ? '-on' : '-off');
      default: return type;
    }
  }

  renderSelection() {
    const { style, selected, id } = this.props;
    
    if(selected.includes(id)) {
      const { width, height } = style;
      const offset = 0.2;
      const widthOffset = offset * width; 
      const heightOffset = offset * height; 
      const svgStyle = {
        width: width + widthOffset,
        height: height + heightOffset,
        top: -0.5 * heightOffset,
        left: -0.5 * widthOffset
      };
      
      return (
        <svg className="selection" style={svgStyle}>
          <rect width={svgStyle.width} height={svgStyle.height} style={{ strokeWidth: "2", stroke: "rgb(100, 100, 255)", fill: "transparent"}} />
        </svg>
      );
    }
  }

  render() {
    const { style = {}, onDrag, onMouseDown, onClick, onMouseUp, classes, gate } = this.props;
    const id = gate ? gate.id : undefined;
    return (
        <div 
          style={style}
          className={classes.gate} 
          draggable={gate !== undefined}
          onDrag={e => { e.stopPropagation(); onDrag(e); }}
          onClick={onClick}
          onDragStart={this.onDragStart}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          id={id}
          ref="container">
          {this.renderSelection()}
          <img className={classes.gateImg} id={id} draggable={false} src={`icons/${this.getIconName()}.svg`} />
          {this.renderTerminals()}
        </div>
    );
  }
}

Gate.defaultProps = {
  state: {},
  selected: []
};

export default injectSheet(style)(Gate);