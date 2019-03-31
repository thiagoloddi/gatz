import React from 'react';
import injectSheet from 'react-jss';
import { LINE_WIDTH } from '../constants/globals.constants';
import { isHorizontal, isBottomSegment, getHorizontalDelta, getVerticalDelta, isVertical, isRightSegment } from '../../../utils/segments.utils';

const style = {
  segment: ({ segment, zoom }) => ({
    position: 'absolute',
    height: Math.round(Math.max(LINE_WIDTH, Math.abs(getVerticalDelta(segment))) * zoom) + 'px',
    width: Math.round(Math.max(LINE_WIDTH, Math.abs(getHorizontalDelta(segment))) * zoom) + 'px',
    top: Math.round((Math.min(segment.s.y, segment.e.y) - (isHorizontal(segment) && isBottomSegment(segment) ? LINE_WIDTH : 0)) * zoom) + 'px',
    left: Math.round((segment.s.x - (isVertical(segment) && isRightSegment(segment) ? LINE_WIDTH : 0)) * zoom) + 'px',
    backgroundColor: 'black'
  })
};

const Segment = ({ classes }) => {
  return (
    <div className={classes.segment} />
  );
}

export default injectSheet(style)(Segment);