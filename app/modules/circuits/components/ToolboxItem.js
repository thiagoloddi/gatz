import React from 'react'
import Element from './Element';
import Gate from './Gate';

export default ({ elType, onGateClick, selected }) => {

  return (
    <div onClick={onGateClick.bind(null, elType)} className={`gate-container ${selected == elType ? "-selected" : ""}`}>
      <Gate elType={elType} />
    </div>
  )
}
