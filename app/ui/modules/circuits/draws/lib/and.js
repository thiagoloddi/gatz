
export default (canvas, x = 0, y = 0) => {
  const ctx = canvas.getContext('2d');
  const GATE_HEIGHT = canvas.height;
  const GATE_WIDTH = canvas.width;

  const INPUT_LENGTH = 0.15 * GATE_WIDTH;
  const INPUT_OFFSET = 0.3 * GATE_HEIGHT;
  const RADIUS = GATE_HEIGHT / 2;
  const GATE_LENGTH = GATE_WIDTH - (RADIUS + 2 * INPUT_LENGTH);
  
  ctx.clearRect(0, 0, GATE_WIDTH, GATE_HEIGHT);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000'
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

  return { terminals: { 
    A: { x: 0, y: INPUT_OFFSET },
    B: { x: 0, y: GATE_HEIGHT - INPUT_OFFSET },
    OUT: { x: GATE_WIDTH, y: RADIUS }
  }};
}