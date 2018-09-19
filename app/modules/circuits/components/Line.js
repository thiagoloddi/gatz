import React, { PureComponent } from 'react'

export default class Line extends PureComponent {

  renderSegments() {
    const { hasPower } = this.props;
    return this.props.segments.map((seg, i) =>{
      return <div key={i} style={seg} className={`segment ${hasPower ? '-power' : ''}`}></div>
    }
    );
  }

  render() {
    const { lines } = this.props;
    return (
      <div ref="lines" className="lines" style={lines}>
        {this.renderSegments()}
      </div>
    );
  }
}
