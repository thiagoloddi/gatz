import React, { Component } from 'react'
import ToolboxItem from './ToolboxItem';
import { AND, SWITCH } from '../constants/gates';
export default class Toolbox extends Component {

  render() {
    return (
      <div ref="toolbox" className="tool-box">
      
        <ToolboxItem gateType={AND} onGateClick={this.props.onGateClick} selected={this.props.selected}>
          <Element gateType={AND} />
        </ToolboxItem>
        <ToolboxItem gateType={SWITCH} onGateClick={this.props.onGateClick} selected={this.props.selected} />
      </div>
    )
  }
}
