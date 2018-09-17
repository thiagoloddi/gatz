import React from 'react'

export default ({ onZoom, x, y, zoom }) => {
  return (
    <div className="bottom-control">
      <div className="center">
        <img onClick={onZoom.bind(null, "out")} src="/icons/minus.svg" />
        <img onClick={onZoom.bind(null, "in")} src="/icons/plus.svg" />
      </div>
      <div className="right">
        {`(${x}, ${y}, ${zoom})`}
      </div>
    </div>
  );
}