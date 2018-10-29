import React, { PureComponent } from 'react'
import c, { SWITCH } from '../constants/gates';
import { TERMINAL_RADIUS } from '../constants/globals.constants';

export default class Element extends PureComponent {

  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.constants = c[props.gateType];


  }
  
  onDragStart(e) {
    e.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
    e.stopPropagation();
    if(this.props.onDragStart) this.props.onDragStart(e);
  }

  renderTerminals() {
    if(this.props.isCanvas) {
      const { zoom, id, onTerminalClick = () => {}, lines, state } = this.props;
      const { INPUT_LENGTH } = this.constants;
      let containerHeight = TERMINAL_RADIUS * 2 * zoom;
      if(containerHeight % 2 == 0) containerHeight++;

      return this.constants.TERMINALS.map(({ NAME, X, Y }, i) => {
        const containerStyle = {
          left: (NAME == 'OUT' ? X : X - TERMINAL_RADIUS) * zoom,
          top: Y * zoom - containerHeight / 2,
          width: (INPUT_LENGTH + TERMINAL_RADIUS) * zoom,
          height: containerHeight,
        };
        const terminalStyle = {
          borderWidth: TERMINAL_RADIUS * zoom,
          [NAME == 'OUT' ? 'right' : 'left']: 0
        };
        return (
          <div className="terminal-container" style={containerStyle} onClick={onTerminalClick.bind(null, { terminal: NAME, gateId: id })} >
            <div
              className={`terminal ${lines[NAME] ? '-connected' : ''} ${state[NAME] ? '-power' : ''}`} 
              key={i}
              style={terminalStyle}></div>
          </div>
        );
      }
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

  renderSelection() {
    const { style, selected, id } = this.props;
    
    
    console.log(selected);
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
    const { style = {}, id, onDrag, onMouseDown, isCanvas, onClick, onMouseUp } = this.props;
    return (
        <div 
          style={style}
          className={`gate ${isCanvas ? '-canvas' : ''}`} 
          draggable={id !== undefined}
          onDrag={e => { e.stopPropagation(); onDrag(e); }}
          onClick={onClick}
          onDragStart={this.onDragStart}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          id={id} 
          ref="container">
          {this.renderSelection()}
          <img id={id} draggable={false} src={`icons/${this.getIconName()}.svg`} />
          {this.renderTerminals()}
        </div>
    );
  }
}

Element.defaultProps = {
  state: {},
  selected: []
}