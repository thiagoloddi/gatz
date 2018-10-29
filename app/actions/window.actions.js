export const UPDATE_ZOOM = 'UPDATE_ZOOM';
export const SELECT_ELEMENT = 'SELECT_ELEMENT';
export const SET_CANVAS_POSITION = 'SET_CANVAS_POSITION';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const ADD_ELEMENT_TO_SELECTION = 'ADD_ELEMENT_TO_SELECTION';

export const updateZoomAction = zoom => {
  return {
    type: UPDATE_ZOOM,
    payload: zoom
  };
};

export const selectElementAction = el => {
  return { 
    type: SELECT_ELEMENT,
    payload: el
  };
};

export const addElementToSelectionAction = els => {
  return {
    type: ADD_ELEMENT_TO_SELECTION,
    payload: els
  }
}

export const setCanvasPosition = (x, y) => {
  return {
    type: SET_CANVAS_POSITION,
    payload: { x, y }
  };
};

export const clearSelectionAction = () => {
  return {
    type: CLEAR_SELECTION
  }
}