import { Cell, types } from "./cell";
export class Snake {
  constructor(ctx) {
    this.ctx = ctx;
    this.cells = [
      { col: 7, row: 8 },
      { col: 7, row: 9 },
    ];
  }

  render() {
    this.cells.forEach((snakeCell) => {
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
