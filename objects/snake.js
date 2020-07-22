import { Cell, types } from "./cell";
import { objects } from "./index";

export class Snake {
  constructor(ctx) {
    this.ctx = ctx;
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
