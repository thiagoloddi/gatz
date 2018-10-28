import React, { Component } from 'react'
import { connect } from 'react-redux';

import Canvas from './components/Canvas';
import Toolbox from './components/Toolbox/Toolbox';
import { updateZoomAction } from '../../actions/window.actions';
import WindowController from './controllers/WindowController';
import Header from './components/Header';


class Circuits extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="circuits">
        <Header />
        <Toolbox />
        <Canvas />
      </div>
    );
  }
}

export default Circuits;

// export default connect(({ window, toolbox }) => {
//   return {
//     zoom: window.zoom,
//     selected: toolbox.selected
//   };
// }, { updateZoomAction })(Circuits);