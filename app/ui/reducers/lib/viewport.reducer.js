import { SET_VIEWPORT_POSITION, SET_ZOOM_ACTION } from "../../actions/viewport.actions";

const INITAL_STATE = {
  position: { x: 0, y: 0 },
  zoom: 1
};

export default (state = INITAL_STATE, action) => {
  switch(action.type) {
    
    case SET_VIEWPORT_POSITION: return { ...state, position: action.payload };

    case SET_ZOOM_ACTION: return { ...state, zoom: action.payload };

    default: return state;  
  }
}