import React, { Component } from 'react'
import Canvas from './components/Canvas';

export default class Circuits extends Component {

  render() {
    return (
      <div className="circuits">
        <div ref="toolbox" className="tool-box"></div>
        <Canvas />
      </div>
    )
  }
}