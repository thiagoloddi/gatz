import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { addElementAction, updateElementAction, setDrawingLineAction } from '../../../actions/element.actions';
import TerminalController from '../controllers/TerminalController';

const TERMINAL_WIDTH = 5;
const TERMINAL_BORDER = 4
const TERMINAL_SIZE = TERMINAL_WIDTH + 2 * TERMINAL_BORDER;

const style = {
  terminal: ({ zoom, position }) => {
    return ({
      boxSizing: 'content-box',
      position: 'absolute',
      backgroundColor: 'white',
      left: Math.round((position.x - TERMINAL_SIZE / 2) * zoom),
      top: Math.round((position.y - TERMINAL_SIZE / 2) * zoom),
      border: `${Math.round(zoom * TERMINAL_BORDER)}px solid rgba(0, 0, 0, 0.3)`,
      width:  `${Math.round(zoom * TERMINAL_WIDTH)}px`,
      height:  `${Math.round(zoom * TERMINAL_WIDTH)}px`,
    })
  }
};

class Terminal extends Component {

  constructor(props) {
    super(props);

    this.controller = new TerminalController(this);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.stopPropagation();

    const { name, gateId } = this.props;
    if(!this.props.drawingLine) {
      this.controller.createLine(name, gateId);
    } else {
      this.controller.finishLine(name, gateId);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.terminal}
        onClick={this.onClick}  
      />
    );
  }
}

const mapStateToProps = ({ elements }) => ({
  elements: elements.all,
  drawingLine: elements.drawingLine
})

export default compose(
  injectSheet(style),
  connect(mapStateToProps, { addElementAction, updateElementAction, setDrawingLineAction })
)(Terminal);