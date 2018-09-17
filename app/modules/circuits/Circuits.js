import React, { Component } from 'react'
import Canvas from './components/Canvas';
import Gate from './components/Gate';
import Toolbox from './components/Toolbox';

export default class Circuits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      zoom: 1
    };

    this.onGateClick = this.onGateClick.bind(this);
    this.onZoom = this.onZoom.bind(this);
  }

  onGateClick(elType) {
    this.setState({ selected: elType });
  }

  onZoom(type) {
    const step = .5;
    let m = 1;
    switch(type) {
      case 'in': m = 1; break;
      case 'out': m = -1; break;
    }

    let zoom = this.state.zoom + m*step;

    zoom = Math.max(zoom, 0.5);
    zoom = Math.min(zoom, 2);

    this.setState({ zoom });
  }

  render() {
    const { selected, zoom } = this.state;
    return (
      <div className="circuits">
        <Toolbox selected={selected} onGateClick={this.onGateClick} />
        <Canvas onZoom={this.onZoom} zoom={zoom} selected={selected} onGateClick={this.onGateClick} />
      </div>
    );
  }
}