import { Cell, types } from "./cell";

const directions = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
export class Snake {
  constructor(ctx) {
    this.ctx = ctx;
    this.headCol = 8;
    this.headRow = 8;
    this.direction = directions.UP;

    this.cells = [
      { col: this.headCol, row: this.headRow },
      { col: this.headCol, row: 9 },
      { col: this.headCol, row: 10 },
    ];

    document.addEventListener("keydown", (e) => {
      this.setDirection(e.keyCode);
    });
  }

  setDirection(keyCode) {
    switch (keyCode) {
      case 38:
        this.direction = directions.UP;
        break;
      case 37:
        this.direction = directions.LEFT;
        break;
      case 39:
        this.direction = directions.RIGHT;
        break;
      case 40:
        this.direction = directions.DOWN;
        break;
    }
  }

  countNextCell() {
    switch (this.direction) {
      case directions.UP:
        if (this.direction === directions.DOWN) {
          this.direction = directions.UP;
          return;
        }
        this.headRow--;
        if (this.headRow <= 0) {
          this.headRow = 15;
        }
        break;
      case directions.DOWN:
        this.headRow++;
        if (this.headRow > 15) {
          this.headRow = 1;
        }
        break;
      case directions.LEFT:
        this.headCol--;
        if (this.headCol <= 0) {
          this.headCol = 15;
        }
        break;
      case directions.RIGHT:
        this.headCol++;
        if (this.headCol > 15) {
          this.headCol = 1;
        }
        break;
    }

    return {
      col: this.headCol,
      row: this.headRow,
    };
  }

  move() {
    const nextCell = this.countNextCell();
    console.log(nextCell);
    this.cells.push(nextCell);
    this.cells.shift();
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
    this.move();
  }
}
