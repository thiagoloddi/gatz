import React from 'react';
import injectSheet from 'react-jss';

const OFFSET = 5;

const style = {
  selection: ({ height, width, zoom }) => ({
    position: 'absolute',
    top: Math.round(zoom * (-OFFSET)),
    left: Math.round(zoom * (-OFFSET)),
    width: Math.round(zoom * (width + 2 * OFFSET)),
    height: Math.round(zoom * (height + 2 * OFFSET)),
  })
};

const Selection = (props) => {
  const { height, width } = style.selection(props);
  return (
    <svg className={props.classes.selection}>
      <rect width={width} height={height} style={{ strokeWidth: "2", stroke: "rgb(100, 100, 255)", fill: "transparent"}} />
    </svg>
  );
}

export default injectSheet(style)(Selection);