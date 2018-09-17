import uuidv4 from 'uuid/v4';
import _ from "lodash";

import { TERMINALS } from '../constants/gates/and.constants';
 
export default class GateModel {
  constructor(coords, dimen, id) {
    this.id = id || uuidv4();
    this.dimen = dimen;
    this.x = coords.x - dimen.width / 2;
    this.y = coords.y - dimen.height / 2;
    this.clickOffset = { x: 0, y: 0 };
    this.lines = {
      A: null,
      B: null,
      OUT: null
    };
  }

  getTerminalCoords(terminal) {
    const { x,  y } = this;
    const { X, Y } = _.find(TERMINALS, { NAME: terminal });
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

  toStateObject(zoom = 1) {
    const { x, y, id, dimen: { width, height }} = this;
    return {
      elType: 'GATE',
      id,
      style: {
        position: 'absolute',
        height: height * zoom,
        width: width * zoom,
        left: x * zoom,
        top: y * zoom
      }
    }
  }
}