import React from 'react'
import Gate from '../Gate';
import injectSheet from 'react-jss';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { selectItemAction } from '../../../../actions/toolbox.actions';

const style = {
  container: {
    height: '70px',
    width: '70px',
    textAlign: 'center',
    border: '1px solid black',
    padding: '10px'
  }
};  

const ToolboxItem = ({ gateType, classes, selectItemAction }) => {

  const selectItem = () => {
    selectItemAction(gateType);
  }

  return (
    <div className={classes.container} onClick={selectItem}>
      <Gate toolbox type={gateType}/>
      <span>{gateType}</span>
    </div>
  )
}

export default compose(
  connect(null, { selectItemAction }),
  injectSheet(style)
)(ToolboxItem);