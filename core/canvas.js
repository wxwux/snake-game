import { Board } from "../objects/board";
import { Snake } from "../objects/snake";
import { Apple } from "../objects/apple";
import { Scores } from "../objects/scores";
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
