import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';

import c from '../constants/gates';
import Terminal from './Terminal';
import Selection from './Selection';
import GateController from '../controllers/GateController';
import Coordinates from '../models/Coordinates';
import { setCoordsAction, addElementToSelectionAction } from '../../../actions/window.actions';
import { updateElementAction } from '../../../actions/element.actions';

const style = {
  gate: ({ zoom, position, dimensions, toolbox }) => {
    if(!toolbox) {
      const { x, y } = position;
      const { width, height } = dimensions;
      return {
        position: 'absolute',
        height: Math.round(height * zoom),
        width: Math.round(width * zoom),
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

    this.controller = new GateController(this);
    this.coords = new Coordinates();


    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this); 
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);


    this.constants = c[props.type];

  }
  
  onDragStart(e) {
    if(this.props.toolbox) return;

    this.controller.startGateDrag(e);
  }

  onDrag(e) {
    e.stopPropagation();
    
    if(this.props.toolbox) return;
    
    this.controller.dragGate(e);
  }

  onMouseDown(e) {
    e.stopPropagation();

    if(e.ctrlKey) {
      this.controller.selectGate(e.currentTarget.id);
    }
  }

  onClick(e) {
    if(!this.props.toolbox) e.stopPropagation();
  } 

  renderTerminals() {
    if(!this.props.toolbox) {
      const { zoom, id } = this.props;

      return this.constants.TERMINALS.map(({ NAME, X, Y }, i) => {
        const position = { x: X, y: Y };

        return (
          <Terminal
            position={position}
            zoom={zoom}
            name={NAME}
            gateId={id}
            key={id + i}
          />
        );
      });
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
    const { selected, zoom, id, toolbox } = this.props;
    if(!toolbox && selected.includes(id)) {
      return (
        <Selection zoom={zoom} height={this.constants.HEIGHT} width={this.constants.WIDTH} />
      );
    }
  }

  render() {
    const { classes, gate, id } = this.props;
    return (
        <div 
          className={classes.gate} 
          draggable={gate !== undefined}
          onDrag={this.onDrag}
          onClick={this.onClick}
          onDragStart={this.onDragStart}
          onMouseDown={this.onMouseDown}
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

const mapStateToProps = ({ window, elements, viewport }) => {
  return ({
    zoom: viewport.zoom,
    selected: window.selected,
    elements: elements.all,
    coords: window.coords
  })
};

export default compose(
  connect(mapStateToProps, { setCoordsAction, updateElementAction, addElementToSelectionAction }),
  injectSheet(style)
)(Gate);