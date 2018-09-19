export const HEIGHT = 40;
export const WIDTH = 60;

const PADDING = 2;
const INPUT_LENGTH = 0.15 * WIDTH;
const INPUT_OFFSET = 0.3 * HEIGHT;
const RADIUS = HEIGHT / 2;
const GATE_LENGTH = WIDTH - (RADIUS + 2 * INPUT_LENGTH);

export const TERMINALS = [
  {
    NAME: 'A',
    X: PADDING - 1,
    Y: 0.3 * HEIGHT + PADDING - 1
  },
  {
    NAME: 'B',
    X: PADDING - 1,
    Y: 0.7 * HEIGHT + PADDING - 3
  },
  {
    NAME: 'OUT',
    X: PADDING + WIDTH - 1,
    Y: RADIUS
  }
];