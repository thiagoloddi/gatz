draw = "switch";

var WIDTH = 100;
var HEIGHT = 80;
var PADDING = 2;
var INPUT_LENGTH = WIDTH - HEIGHT;
var RADIUS = (0.8 * HEIGHT) / 2;

function _switch() {
  
  // RECTANGLE
  var rect = new Rectangle(new Point(PADDING, PADDING), new Size(HEIGHT, HEIGHT));
  var rectPath = new Path.Rectangle(rect);
  rectPath.strokeColor = 'black';
  rectPath.strokeWidth = 2;
  rectPath.fillColor = 'white';

  // CIRCLE
  var circlePath = new Path.Circle(new Point(HEIGHT / 2 + PADDING, HEIGHT / 2 + PADDING), RADIUS);
  circlePath.strokeColor = 'black';
  circlePath.strokeWidth = 2;
  circlePath.fillColor = '#A3BEA3';
  // circlePath.fillColor = '#EAC8CA';

  // OUTPUT
  var outStart = new Point(PADDING + HEIGHT, PADDING + HEIGHT / 2);
  var outputPath = new Path.Line(outStart, outStart + [ INPUT_LENGTH, 0 ]);
  outputPath.strokeColor = 'black';
  outputPath.strokeWidth = 2;

  // LETTER
  var letter = new PointText(new Point(41, 55));
  letter.justification = 'center';
  letter.fillColor = 'black';
  letter.content = 'S';
  letter.fontSize = 40;
}

_switch();