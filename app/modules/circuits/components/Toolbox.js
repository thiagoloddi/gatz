import React, { Component } from 'react'
import Gate from './Gate';
import Element from './Element';
import ToolboxItem from './ToolboxItem';
export default class Toolbox extends Component {

  render() {
    return (
      <div ref="toolbox" className="tool-box">
        <ToolboxItem elType="and" onGateClick={this.props.onGateClick} selected={this.props.selected} />
        <ToolboxItem elType="switch" onGateClick={this.props.onGateClick} selected={this.props.selected} />
      </div>
    )
  }
}
