
export default (canvas, x = 0, y = 0, scale = 1) => {
  const ctx = canvas.getContext('2d');
  const PADDING = 10 * scale;
  const INPUT_LENGTH = 15 * scale;
  const INPUT_OFFSET = 15 * scale;
  const GATE_HEIGHT = 75 * scale - 2 * PADDING;
  const RADIUS = GATE_HEIGHT / 2;
  const GATE_LENGTH = 100 * scale - (2 * (PADDING + INPUT_LENGTH) + RADIUS);
  x = x + PADDING;
  y = y + PADDING;
  
  ctx.beginPath();
  // INPUT A
  ctx.moveTo(x, y + INPUT_OFFSET);
  ctx.lineTo(x + INPUT_LENGTH, y + INPUT_OFFSET);
  
  // INPUT B
  ctx.moveTo(x, y + GATE_HEIGHT - INPUT_OFFSET);
  ctx.lineTo(x + INPUT_LENGTH, y + GATE_HEIGHT - INPUT_OFFSET);

  // GATE
  const left = x + INPUT_LENGTH;
  const center = left + GATE_LENGTH;
  const right = center + RADIUS;
  const top = y;
  const middle = top + RADIUS;
  const bottom = middle + RADIUS;
  ctx.moveTo(left, top);
  ctx.lineTo(left, bottom);
  ctx.lineTo(center, bottom);
  ctx.arcTo(right, bottom, right, middle, RADIUS);
  ctx.arcTo(right, top, center, top, RADIUS);
  ctx.lineTo(x + INPUT_LENGTH, y);
  ctx.fillStyle = "white"
  ctx.fill();

  // OUTPUT
  ctx.moveTo(right, middle);
  ctx.lineTo(right + INPUT_LENGTH, middle);
  ctx.stroke();
}