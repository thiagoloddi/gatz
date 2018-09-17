draw = "and";

var GATE_WIDTH = 60;
var GATE_HEIGHT = 40;

var PADDING = 2;
var INPUT_LENGTH = 0.15 * GATE_WIDTH;
var INPUT_OFFSET = 0.3 * GATE_HEIGHT;
var RADIUS = GATE_HEIGHT / 2;
var GATE_LENGTH = GATE_WIDTH - (RADIUS + 2 * INPUT_LENGTH);

function and() {
  
  // INPUT A
  var pathA = new Path();
  pathA.strokeColor = 'black';
  var inputAStart = new Point(PADDING, INPUT_OFFSET + PADDING);
  pathA.moveTo(inputAStart);
  pathA.lineTo(inputAStart + [ INPUT_LENGTH, 0 ]);

  // INPUT B
  var pathB = new Path();
  pathB.strokeColor = 'black';
  var inputBStart = new Point(PADDING, GATE_HEIGHT - INPUT_OFFSET + PADDING);
  pathB.moveTo(inputBStart);
  pathB.lineTo(inputBStart + [ INPUT_LENGTH, 0 ]);

  // GATE
  var pathGate = new Path();
  pathGate.strokeColor = 'black';
  pathGate.fillColor = 'white';
  var gateStart = new Point(INPUT_LENGTH + PADDING, PADDING);
  pathGate.moveTo(gateStart);
  pathGate.lineTo(gateStart + [ GATE_LENGTH, 0 ]);
  pathGate.arcTo(gateStart + [ GATE_LENGTH, GATE_HEIGHT]);
  pathGate.lineTo(gateStart + [ 0, GATE_HEIGHT ]);
  pathGate.lineTo(gateStart);
  pathGate.closePath();

  var pathOut = new Path();
  pathOut.strokeColor = 'black';
  var outStart = new Point(PADDING + INPUT_LENGTH + GATE_LENGTH + RADIUS, PADDING + RADIUS);
  pathOut.moveTo(outStart);
  pathOut.lineTo(outStart + [ INPUT_LENGTH, 0 ]);
}

and();