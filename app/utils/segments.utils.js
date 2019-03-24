export const isHorizontal = segment => segment.s.y == segment.e.y;

export const isVertical = segment => segment.s.x == segment.e.x;

export const isBottomSegment = segment => segment.s.y != 0;

export const isRightSegment = segment => segment.s.x != 0;

export const getHorizontalDelta = segment => segment.s.x - segment.e.x;

export const getVerticalDelta = segment => segment.s.y - segment.e.y;