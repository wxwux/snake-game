import { Board } from "./board";
import { Snake } from "./snake";
export class Canvas {
  constructor(container) {
    this.context = container.getContext("2d");
  }

  board() {
    return new Board(this.context)
  }

  snake() {
    return new Snake(this.context);
  }

  refreshScreen() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }
}