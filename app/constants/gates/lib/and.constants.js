export const HEIGHT = 84;
export const WIDTH = 124;

export const PADDING = 2;
export const GATE_HEIGHT = HEIGHT - 2 * PADDING;
export const GATE_WIDTH = WIDTH - 2 * PADDING;
export const INPUT_LENGTH = 0.15 * GATE_WIDTH;
export const INPUT_OFFSET = 0.3 * GATE_HEIGHT;
export const RADIUS = GATE_HEIGHT / 2;
export const GATE_LENGTH = GATE_WIDTH - (RADIUS + 2 * INPUT_LENGTH);

export const TERMINALS = [
  {
    NAME: 'A',
    X: PADDING,
    Y: 0.3 * GATE_HEIGHT + PADDING
  },
  {
    NAME: 'B',
    X: PADDING,
    Y: 0.7 * GATE_HEIGHT + PADDING
  },
  {
    NAME: 'OUT',
    X: WIDTH - PADDING,
    Y: PADDING + RADIUS
  }
];