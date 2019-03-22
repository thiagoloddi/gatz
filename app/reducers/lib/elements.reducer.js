import { ADD_ELEMENT_ACTION, UPDATE_ELEMENT_ACTION } from "../../actions/element.actions";

const INITIAL_STATE = {
  all: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ELEMENT_ACTION:
      return { ...state, all: [ action.payload, ...state.all ] };

    case UPDATE_ELEMENT_ACTION:
      return { ...state, all: state.all.map(el => el.id == action.payload.id ? action.payload : el )}
      
    default:
      return state;
  }
}