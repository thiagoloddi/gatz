export default class Coordinates {
  constructor(menuWidth, padding) {
    this.xOffset = menuWidth + padding;
    this.yOffset = padding;
  }

  windowToCanvas(pageX, pageY, zoom) {
    const { xOffset, yOffset, viewport } = this;
    return { x: (pageX - xOffset + viewport.scrollLeft) / zoom, y: (pageY - yOffset + viewport.scrollTop) / zoom };
  }

  setViewport(vp) {
    this.viewport = vp;
  }
}