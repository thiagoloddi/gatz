import React, { Component } from 'react'
import { connect } from 'react-redux';

import ToolboxItem from './ToolboxItem';
import { selectItemAction } from '../../../../actions/toolbox.actions';
import { AND, SWITCH } from '../../constants/gates';
import SearchBar from './SearchBar';
import ToolboxSection from './ToolboxSection';


class Toolbox extends Component {

  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(item) {
    this.props.selectItemAction(item == this.props.selected ? null : item);
  } 

  render() {
    return (
      <div ref="toolbox" className="tool-box">
        <SearchBar />
        <ToolboxSection title="Logic Gates">
          <ToolboxItem gateType={AND} onGateClick={this.onItemClick} selected={this.props.selected} />
        </ToolboxSection>
        <ToolboxSection title="Power Sources">
          <ToolboxItem gateType={SWITCH} onGateClick={this.onItemClick} selected={this.props.selected} />
        </ToolboxSection>
        {/* 
         */}
      </div>
    )
  }
}

export default connect(({ toolbox }) => {
  return {
    selected: toolbox.selected
  };
}, { selectItemAction })(Toolbox);