export const HEIGHT = 40;
export const WIDTH = 60;

export const PADDING = 2;
export const INPUT_LENGTH = 0.15 * WIDTH;
export const INPUT_OFFSET = 0.3 * HEIGHT;
export const RADIUS = HEIGHT / 2;
export const GATE_LENGTH = WIDTH - (RADIUS + 2 * INPUT_LENGTH);

export const TERMINALS = [
  {
    NAME: 'A',
    X: PADDING,
    Y: 0.3 * HEIGHT + .75
  },
  {
    NAME: 'B',
    X: PADDING,
    Y: 0.7 * HEIGHT - 1
  },
  {
    NAME: 'OUT',
    X: INPUT_LENGTH + GATE_LENGTH + RADIUS - 1,
    Y: RADIUS
  }
];