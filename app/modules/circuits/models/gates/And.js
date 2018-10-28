import { AND } from "../../constants/gates";
import Element from "../Element";

export default class And extends Element {
  constructor(xy) {
    super(xy, AND);
  }
}