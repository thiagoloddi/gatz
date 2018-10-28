import uuidv4 from 'uuid/v4';
import _ from "lodash";
import c from '../constants/gates';
 
export default class Element {
  constructor(coords, type, id) {
    this.id = id || uuidv4();
    this.constants = c[type];
    this.x = coords.x - this.constants.WIDTH / 2;
    this.y = coords.y - this.constants.HEIGHT / 2;
    this.clickOffset = { x: 0, y: 0 };
    this.lines = {
      A: null,
      B: null,
      OUT: null
    };
    this.state = {
      A: false, B: false, OUT: false
    }
    this.type = type;
  }

  getTerminalCoords(terminal) {
    const { x,  y } = this;
    const { X, Y } = _.find(this.constants.TERMINALS, { NAME: terminal });
    return { x: x + X, y: y + Y };
  }

  setClickPositionOffset({ x, y }) {
    this.clickOffset = { x: x - this.x, y: y - this.y };
  }

  updatePosition({ x, y }) {
    this.x = x - this.clickOffset.x;
    this.y = y - this.clickOffset.y;

    for(let k in this.lines) {
      if(this.lines[k])  this.lines[k].updatePosition();
    }
  }

  setTerminalLine(terminalId, line) {
    this.lines[terminalId] = line;
  }

  toStateObject(zoom, extra) {
    if(!zoom) throw new Error(`Zoom is required in toStateObject ${this.type} ${this.id}`);
    const { x, y, id, constants: { WIDTH, HEIGHT }, type } = this;
    return {
      gateType: type,
      elType: 'GATE',
      id,
      style: {
        position: 'absolute',
        height: HEIGHT * zoom + 'px',
        width: WIDTH * zoom + 'px',
        left: x * zoom + 'px',
        top: y * zoom + 'px'
      },
      lines: _.mapValues(this.lines, l => !!l),
      state: { ...this.state },
      ...extra
    }
  }

  updatePower() {
    const { lines, state } = this;
    state.A = lines.A && lines.A.hasPower;
    state.B = lines.B && lines.B.hasPower;
    state.OUT = state.A && state.B;
    if(lines.OUT) {
      lines.OUT.hasPower = state.OUT;

      if(lines.OUT.endGate) lines.OUT.endGate.updatePower();
    }
    
  }

  onGateClick() {}
}