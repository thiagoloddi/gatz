import { ADD_ELEMENT_ACTION, UPDATE_ELEMENT_ACTION, SET_DRAWING_LINE_ACTION } from "../../actions/element.actions";

const INITIAL_STATE = {
  all: [],
  drawingLine: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ELEMENT_ACTION:
      return { ...state, all: [ action.payload, ...state.all ] };

    case UPDATE_ELEMENT_ACTION:
      return { ...state, all: state.all.map(el => el.id == action.payload.id ? action.payload : el )}

    case SET_DRAWING_LINE_ACTION: return { ...state, drawingLine: action.payload };
      
    default:
      return state;
  }
}