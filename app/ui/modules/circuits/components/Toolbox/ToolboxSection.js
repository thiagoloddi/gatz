import React, { Component } from 'react'

export default class ToolboxSection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true
    };

    this.onCollapseClick = this.onCollapseClick.bind(this);
  }

  onCollapseClick() {
    this.setState({ open: !this.state.open})
  }

  render() {
    const { children, title } = this.props;
    const { open } = this.state;
    return ( 
      <div className="toolbox-section">
        <img className="collapse-btn" src={`/icons/${open ? 'minus' : 'plus'}.svg`} />
        <div onClick={this.onCollapseClick} className="title">{title}</div>
        <div className={`children ${open ? '' : '-closed'}`}>{children}</div>
      </div>
    )
  }
}