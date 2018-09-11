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

  addScrollListener() {
    const { canvas } = this;

    if (canvas.addEventListener) {
      // IE9, Chrome, Safari, Opera
      canvas.addEventListener("mousewheel", this.onScroll, false);
      // Firefox
      canvas.addEventListener("DOMMouseScroll", this.onScroll, false);
    }
    // IE 6/7/8
    else canvas.attachEvent("onmousewheel", this.onScroll);

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

  clear() {
    const { canvas, scale, viewport } = this;
    const c = canvas.getContext('2d'); 
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = '#f1f1f1';
    c.fillRect(0, 0, canvas.width, canvas.height);
    draws.grid(canvas, scale, viewport);
  }
}