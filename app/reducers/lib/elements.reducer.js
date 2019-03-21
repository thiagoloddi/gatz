import { ADD_ELEMENT_ACTION } from "../../actions/element.actions";

const INITIAL_STATE = {
  all: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ELEMENT_ACTION:
      return { ...state, all: [ action.payload, ...state.all ] };
      
    default:
      return state;
  }
}