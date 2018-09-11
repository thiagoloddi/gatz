export default (canvas, scale, { x, y }) => {
  const c = canvas.getContext('2d');
  
  const GRID_SPACING = 20 * scale;

  const x0 = Math.abs(x) % GRID_SPACING;
  const y0 = Math.abs(y) % GRID_SPACING;

  c.beginPath();
  c.strokeStyle = '#d8d8d8'
  for(let i = 0; i < canvas.width / GRID_SPACING; i++) {
    c.moveTo(GRID_SPACING * i + x0, 0);
    c.lineTo(GRID_SPACING * i + x0, canvas.height);
  }

  for(let i = 0; i < canvas.width / GRID_SPACING; i++) {
    c.moveTo(0, GRID_SPACING * i + y0);
    c.lineTo(canvas.width, GRID_SPACING * i + y0);
  }

  c.stroke();
}