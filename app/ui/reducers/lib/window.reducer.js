import _ from 'lodash';
import Coordinates from '../../modules/circuits/models/Coordinates';

import {
  UPDATE_ZOOM,
  SELECT_ELEMENT,
  SET_CANVAS_POSITION,
  CLEAR_SELECTION,
  ADD_ELEMENT_TO_SELECTION,
  SET_COORDS_ACTION
} from '../../actions/window.actions';

const INITIAL_STATE = {
  zoom: 1,
  selected: [],
  canvasPosition: { x: 0, y: 0 },
  coords: new Coordinates()

};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {

    case UPDATE_ZOOM: return { ...state, zoom: payload };
    case SELECT_ELEMENT: return { ...state, selected: [payload] };
    case CLEAR_SELECTION: return { ...state, selected: [] };
    case SET_CANVAS_POSITION: return { ...state, canvasPosition: payload };
    case ADD_ELEMENT_TO_SELECTION: 
      const selected =  [...state.selected, payload ];
      return { ...state, selected: _.uniq(selected) };
    
    case SET_COORDS_ACTION: return { ...state, coords: payload };
    
    default: return state;
  }
}