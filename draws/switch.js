draw = "switch";

var WIDTH = 50;
var HEIGHT = 40;
var PADDING = 2;
var INPUT_LENGTH = WIDTH - HEIGHT;
var RADIUS = (0.8 * HEIGHT) / 2;

function _switch() {
  
  // RECTANGLE
  var rect = new Rectangle(new Point(PADDING, PADDING), new Size(HEIGHT, HEIGHT));
  var rectPath = new Path.Rectangle(rect);
  rectPath.strokeColor = 'black';
  rectPath.fillColor = 'white';

  // CIRCLE
  var circlePath = new Path.Circle(new Point(HEIGHT / 2 + PADDING, HEIGHT / 2 + PADDING), RADIUS);
  circlePath.strokeColor = 'black';
  circlePath.fillColor = '#A3BEA3';
  // circlePath.fillColor = '#EAC8CA';

  // OUTPUT
  var outStart = new Point(PADDING + HEIGHT, PADDING + HEIGHT / 2);
  var outputPath = new Path.Line(outStart, outStart + [ INPUT_LENGTH, 0 ]);
  outputPath.strokeColor = 'black';

  // LETTER
  var letter = new PointText(new Point(22, 29));
  letter.justification = 'center';
  letter.fillColor = 'black';
  letter.content = 'S';
  letter.fontSize = 20;
}

_switch();