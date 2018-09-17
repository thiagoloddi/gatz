import draws from '../draws';

export default class DrawingArea {
  constructor(canvas) {
    this.scale = 1;
    this.dragStart = null;
    this.viewport = { x: 0, y: 0 };
    
    this.onScroll = this.onScroll.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    
  }
  
  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setCanvasContainer(container) {
    this.container = container;
  }

  setSize(padding) {
    this.canvasHeight = this.container.clientHeight - 2 * padding;
    this.canvasWidth = this.container.clientWidth - 2 * padding;
  }
  
  updateSize(zoom = 1) {
    this.canvas.height = this.canvasHeight * zoom;
    this.canvas.width = this.canvasWidth * zoom;
    this.container.style.width = this.canvasWidth * zoom + "px";
    this.container.style.height = this.canvasHeight * zoom + "px";
  }
  
  onScroll({ deltaY }) {
    if(deltaY > 0) {
      this.scale = this.scale / 1.1;
    } else {
      this.scale = this.scale * 1.1;
    }
    this.update();
  }

  onDrag(e) {
    e = e || window.event;
    const { pageX, pageY } = e;
    this.viewport = { x: pageX - this.dragStart.x, y: pageY - this.dragStart.y };
    this.update();
  }

  onDragStart(e) {
    const { pageX, pageY } = e;
    this.dragStart = { x: pageX, y: pageY };
  }

  update() {
    this.clear();
  }

  clear(zoom = 1) {
    const { canvas, scale, viewport } = this;
    const c = canvas.getContext('2d'); 
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = '#f1f1f1';
    c.fillRect(0, 0, canvas.width, canvas.height);
    draws.grid(canvas, zoom, viewport);
  }
}