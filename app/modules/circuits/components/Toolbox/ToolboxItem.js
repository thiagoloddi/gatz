import React from 'react'
import Gate from '../Gate';

export default ({ gateType, onGateClick, selected }) => {
  return (
    <div onClick={onGateClick.bind(null, gateType)} className={`gate-container ${selected == gateType ? "-selected" : ""}`}>
      <Gate toolbox type={gateType}/>
      <span>{gateType}</span>
    </div>
  )
}