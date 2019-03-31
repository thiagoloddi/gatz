import Element from "../Element";
import { SWITCH } from "../../constants/gates";


export default class Switch extends Element {
  constructor(xy) {
    super(xy, SWITCH);
  }
  
  toStateObject(zoom) {
    return super.toStateObject(zoom, { hasPower: this.hasPower });
  }

  onGateClick() {
    this.state.OUT = !this.state.OUT;

    this.updatePower();
    return true;
  }

  updatePower() {
    const { OUT } = this.lines;
    if(!OUT) return;

    OUT.hasPower = this.state.OUT;

    const { endGate } = OUT;
    if(!endGate) return;

    endGate.updatePower();
  }
}