import { combineReducers } from 'redux';

import window from './lib/window.reducer';
import toolbox from './lib/toolbox.reducer';
import elements from './lib/elements.reducer';

export default combineReducers({
  window,
  toolbox,
  elements
});