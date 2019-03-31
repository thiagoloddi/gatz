export const ADD_ELEMENT_ACTION = "ADD_ELEMENT_ACTION";
export const UPDATE_ELEMENT_ACTION = "UPDATE_ELEMENT_ACTION";
export const SET_DRAWING_LINE_ACTION = "SET_DRAWING_LINE_ACTION";
export const SET_ELEMENTS_ACTION = "SET_ELEMENTS_ACTION";

export const addElementAction = el => ({
  type: ADD_ELEMENT_ACTION,
  payload: el
});

export const updateElementAction = el => ({
  type: UPDATE_ELEMENT_ACTION,
  payload: el
});

export const setElementsAction = els => ({
  type: SET_ELEMENTS_ACTION,
  payload: els
});

export const setDrawingLineAction = line => ({
  type: SET_DRAWING_LINE_ACTION,
  payload: line
});