import _ from 'lodash'

import { UPDATE_ZOOM, SELECT_ELEMENT, SET_CANVAS_POSITION, CLEAR_SELECTION } from '../../actions/window.actions';

const INITIAL_STATE = {
  zoom: 1,
  selected: [],
  canvasPosition: { x: 0, y: 0 }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {

    case UPDATE_ZOOM: return { ...state, zoom: payload };
    case SELECT_ELEMENT: return { ...state, selected: [payload] };
    case CLEAR_SELECTION: return { ...state, selected: [] };
    case SET_CANVAS_POSITION: return { ...state, canvasPosition: payload };
    
    default: return state;
  }
}