import React from 'react';
import injectSheet from 'react-jss';

const TERMINAL_WIDTH = 5;
const TERMINAL_BORDER = 4
const TERMINAL_SIZE = TERMINAL_WIDTH + 2 * TERMINAL_BORDER;

const style = {
  terminal: ({ zoom, position }) => {
    return ({
      boxSizing: 'content-box',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      left: Math.round((position.x - TERMINAL_SIZE / 2) * zoom),
      top: Math.round((position.y - TERMINAL_SIZE / 2) * zoom),
      border: `${Math.round(zoom * TERMINAL_BORDER)}px solid rgba(0, 0, 0, 0.3)`,
      width:  `${Math.round(zoom * TERMINAL_WIDTH)}px`,
      height:  `${Math.round(zoom * TERMINAL_WIDTH)}px`,
    })
  }
};

const Terminal = ({ onTerminalClick, classes }) => {
  return (
    <div
      className={classes.terminal}
      onClick={onTerminalClick}  
    />
  )
}

export default injectSheet(style)(Terminal);