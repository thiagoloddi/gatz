export const windowToCanvas = (x, y, container)  => {
  
}

/** 
 * coordsToStyle - 
 *  Calculates left and top css attributes based on the gate
 *  coordinates and canvas zoom level
 * @param  {object} coords - the gate's { x, y } coordinates
 * @param  {number} zoom - the current zoom level
 * @returns {object} - the style object with { left, top } attributes
 */
export function coordsToStyle(coords, zoom) {
  
}
/**
 * clickToCoords -
 *  Calculates the gate coordinates based on the click position,
 *  the delta between the click position and gate(0,0) and the 
 *  canvas zoom level
 * @param  {object} click - the click's { x, y } coordinates
 * @param  {object} delta - the click's { dx, dy } delta
 * @param  {number} zoom - the current zoom level
 * @param  {number} toolboxWidth - the left toolbox width
 */
export function clickToCoords({ x, y }, { dx, dy }, zoom, toolboxWidth, padding) {
  return { x: x - (toolboxWidth + dx + padding), y: y - (dy + padding) }
}

/** firstClickToCoords -
 *  Calculates the gate first coords upon dropping on canvas, 
 *  based on the gate dimensions and the zoom level.
 * @param  {} click - the click's { x, y } coordinates
 * @param  {} dimensions - the gate's { w, h } dimensions
 * @param  {} zoom - the current zoom level
 * @param  {} toolboxWidth - the left toolbox width
 */
export function firstClickToCoords({ x, y }, { w, h }, zoom, toolboxWidth, padding) {
  return { x: x - (w * zoom / 2 + toolboxWidth + padding), y: y - (h * zoom / 2 + padding) };
}