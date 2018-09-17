import React, { Component } from 'react'
import draw from '../draws';

export default class Line extends Component {

  renderSegments() {
    return this.props.segments.map((seg, i) =>{
      return <div key={i} style={seg} className="segment"></div>
    }
    );
  }

  // componentDidMount() {
  //   const { lines, canvas } = this.refs;
  //   const { segments } = this.props;
  //   canvas.height = lines.clientHeight;
  //   canvas.width = lines.clientWidth;

  //   draw.segments(canvas, segments);
  // }

  // componentDidUpdate() {
  //   const { lines, canvas } = this.refs;
  //   const { segments } = this.props;
  //   canvas.height = lines.clientHeight;
  //   canvas.width = lines.clientWidth;

  //   draw.segments(canvas, segments);
  // }

  render() {
    const { lines } = this.props;
    return (
      <div ref="lines" className="lines" style={lines}>
        {this.renderSegments()}
        {/* <canvas ref="canvas"></canvas> */}
      </div>
    );
  }
}
