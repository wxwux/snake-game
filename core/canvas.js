import { Board } from "./board";
import { Snake } from "./snake";
export class Canvas {
  constructor(container) {
    this.context = container.getContext("2d");
    this.board = new Board(this.context);
    this.snake = new Snake(this.context);
  }

  refreshScreen() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }
}
