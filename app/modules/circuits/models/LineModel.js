import uuid from 'uuid/v4';
import { LINE_WIDTH } from '../constants/globals.constants';

export default class LineModel {
  constructor(gate, terminal, id) {
    const startPosition = gate.getTerminalCoords(terminal);
    this.start = startPosition;
    this.end = startPosition;
    this.segments = [{ s: { ...this.start }, e: { ...this.start }}]
    this.id = id || uuid();
    this.direction = terminal == 'OUT' ? 'right' : 'left' ;
    this.startGate = gate;
    this.startTerminal = terminal;
    this.endGate = null;
    this.endTerminal = null;
    this.hasPower = false;
  }

  setEndPosition(endPosition) {
    this.end = endPosition;
  }

  setEndGate(gate, terminal) {
    this.endGate = gate;
    this.endTerminal = terminal;
    this.end = gate.getTerminalCoords(terminal);
  }

  updatePosition() {
    this.start = this.startGate.getTerminalCoords(this.startTerminal);
    if(this.endGate) {
      this.end = this.endGate.getTerminalCoords(this.endTerminal);
    }
  }

  getSegments() {
    const { start, end } = this;
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let segments = [];
    let p1, p2, p3, p4;

    if(dy != 0) {
      // right
      if(dx > 0) {
        // bottom
        if(dy > 0) {
          p1 = { x: 0, y: 0 };
          p2 = { x: dx / 2, y: 0 };
          p3 = { x: dx / 2, y: dy };
          p4 = { x: dx, y: dy };
          segments.push({ s: p1, e: p2 });
          segments.push({ s: p3, e: p2 });
          segments.push({ s: p3, e: p4 });
        } 
        // top
        else {
          p1 = { x: 0, y: Math.abs(dy) };
          p2 = { x: dx / 2, y: Math.abs(dy) };
          p3 = { x: dx / 2, y: 0 };
          p4 = { x: dx, y: 0 };
          segments.push({ s: p1, e: p2 });
          segments.push({ s: p2, e: p3 });
          segments.push({ s: p3, e: p4 });
        }

      }
      // left 
      else {
        dx = Math.abs(dx)
        // bottom
        if(dy > 0) {
          dy = Math.abs(dy);
          p1 = { x: dx, y: 0 };
          p2 = { x: dx, y: dy / 2 };
          p3 = { x: 0, y: dy / 2 };
          p4 = { x: 0, y: dy };
          segments.push({ s: p2, e: p1 });
          segments.push({ s: p3, e: p2 });
          segments.push({ s: p4, e: p3 });
        }
        // top
        else {
          dy = Math.abs(dy);
          p1 = { x: dx, y: dy };
          p2 = { x: dx, y: dy / 2 };
          p3 = { x: 0, y: dy / 2 };
          p4 = { x: 0, y: 0 };
          segments.push({ s: p1, e: p2 });
          segments.push({ s: p3, e: p2 });
          segments.push({ s: p3, e: p4 });
        }
        
      }
    }

    return segments;
  }

  toStateObject(zoom) {
    const segments = this.getSegments();
    return {
      elType: 'LINE',
      id: this.id,
      segments: segments.map(seg => {return ({
        height: Math.floor(Math.max(LINE_WIDTH, Math.max(LINE_WIDTH, Math.abs(seg.s.y - seg.e.y)) * zoom)) + 'px',
        width: Math.floor(Math.max(LINE_WIDTH, Math.max(LINE_WIDTH, Math.abs(seg.s.x - seg.e.x)) * zoom)) + (seg.s.y == seg.e.y ? Math.floor(zoom) : 0) + 'px',
        top: Math.floor(seg.e.y * zoom) + 'px',
        left: Math.floor(seg.s.x * zoom) + 'px',
      })}),
      lines: this.getLinesStyle(zoom),
      hasPower: this.hasPower
    }
  }

  getLinesStyle(zoom) {
    const { start, end } = this;
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    if(dx > 0) {
      return {
        height: Math.abs(dy) * zoom + 'px',
        width: Math.abs(dx) * zoom + 'px',
        top: (start.y < end.y ? start.y : end.y) * zoom + 'px',
        left: start.x * zoom + 'px',
      };
    }
    else if(dy > 0) {
      return {
        height: Math.abs(dy) * zoom + 'px',
        width: Math.abs(dx) * zoom + 'px',
        top: start.y * zoom + 'px',
        left: end.x * zoom + 'px'
      }
    }
    else {
      return {
        height: Math.abs(dy) * zoom + 'px',
        width: Math.abs(dx) * zoom + 'px',
        top: end.y * zoom + 'px',
        left: end.x * zoom + 'px'
      };
    }
  }
}