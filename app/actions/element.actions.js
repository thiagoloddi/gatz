export const ADD_ELEMENT_ACTION = "ADD_ELEMENT_ACTION";
export const UPDATE_ELEMENT_ACTION = "UPDATE_ELEMENT_ACTION";
export const SET_DRAWING_LINE_ACTION = "SET_DRAWING_LINE_ACTION";

export const addElementAction = el => ({
  type: ADD_ELEMENT_ACTION,
  payload: el
});

export const updateElementAction = el => ({
  type: UPDATE_ELEMENT_ACTION,
  payload: el
});

export const setDrawingLineAction = line => ({
  type: SET_DRAWING_LINE_ACTION,
  payload: line
});