import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import Segment from './Segment';
import { LINE_WIDTH } from '../constants/globals.constants';

const style = {
  container: ({ line, zoom }) => ({
    position: 'absolute',
    height: Math.round(Math.abs(line.getHeight()) * zoom) + 'px',
    width: Math.round(Math.abs(line.getWidth()) * zoom) + 'px',
    top: Math.round(line.getYOrigin() * zoom),
    left: Math.round(line.getXOrigin() * zoom),
  })
};

class Line extends PureComponent {
  renderSegments() {
    return this.props.line.getSegments().map((segment, i) => <Segment zoom={this.props.zoom} key={i} segment={segment}/>)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {this.renderSegments()}
      </div>
    );
  }
}

export default injectSheet(style)(Line);