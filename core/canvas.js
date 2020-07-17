import { Board } from "./board";
import { Snake } from "./snake";
import { Apple } from "./apple";
import { Scores } from "./scores";
export class Canvas {
  constructor(container) {
    this.context = container.getContext("2d");
    this.board = new Board(this.context);
    this.snake = new Snake(this.context);
    this.apple = new Apple(this.context);
    this.scores = new Scores(this.context);
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
