import { Cell, types } from "./cell";
import { objects } from "./index";

export class Snake {
  constructor(ctx) {
    this.ctx = ctx;
  }

  checkCollision() {
    const { head: snakeHead, position: snakeCells } = state.getState(
      objects.SNAKE
    );
    const snakeBody = snakeCells.slice(1);

    const isHeadHitBody = snakeBody.some((bodyCell) => {
      return bodyCell.col === snakeHead.col && bodyCell.row === snakeHead.row;
    });

    console.log("============");
    console.log("sC", snakeCells);
    console.log("sB", snakeBody);
    console.log("sH", snakeHead);

    if (isHeadHitBody) {
      emitter.emit(events.LOSE);
    }
  }

  render(state) {
    const { position: snakePosition } = state.getState(objects.SNAKE);

    snakePosition.forEach((snakeCell) => {
      const cell = new Cell(
        this.ctx,
        {
          col: snakeCell.col,
          row: snakeCell.row,
        },
        types.SNAKE
      );
      cell.render();
    });
  }
}
