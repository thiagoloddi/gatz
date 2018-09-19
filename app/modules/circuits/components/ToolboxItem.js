import React from 'react'
import Element from './Element';

export default ({ gateType, onGateClick, selected }) => {
  return (
    <div onClick={onGateClick.bind(null, gateType)} className={`gate-container ${selected == gateType ? "-selected" : ""}`}>
      <Element gateType={gateType}/>
    </div>
  )
}
