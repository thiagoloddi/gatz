import { SELECT_ITEM } from '../../actions/toolbox.actions';

const INITIAL_STATE = {
  selected: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {

    case SELECT_ITEM: return { ...state, selected: payload };

    default: return state;
  }
}