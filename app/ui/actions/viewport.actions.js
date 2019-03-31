export const SET_VIEWPORT_POSITION = "SET_VIEWPORT_POSITION";
export const SET_ZOOM_ACTION = "SET_ZOOM_ACTION";


export const setViewportPositionAction = position => ({
  type: SET_VIEWPORT_POSITION,
  payload: position
});

export const setZoomAction = zoom => ({
  type: SET_ZOOM_ACTION,
  payload: zoom
})