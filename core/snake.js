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
      this.detectDirection(e.keyCode);
    });
  }

  setDirection() {
    return {
      up: () => {
        if (this.direction === directions.DOWN) {
          return (this.direction = directions.DOWN);
        }
        this.direction = directions.UP;
      },
      down: () => {
        if (this.direction === directions.UP) {
          return (this.direction = directions.UP);
        }
        this.direction = directions.DOWN;
      },
      left: () => {
        if (this.direction === directions.RIGHT) {
          return (this.direction = directions.RIGHT);
        }
        this.direction = directions.LEFT;
      },
      right: () => {
        if (this.direction === directions.LEFT) {
          return (this.direction = directions.LEFT);
        }
        this.direction = directions.RIGHT;
      },
    };
  }

  detectDirection(keyCode) {
    const direction = this.setDirection();
    switch (keyCode) {
      case 38: //up
        direction.up();
        break;
      case 40: //down
        direction.down();
        break;
      case 37: //left
        direction.left();
        break;
      case 39: //right
        direction.right();
        break;
    }
  }

  countNextCell() {
    switch (this.direction) {
      case directions.UP:
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
    this.cells.unshift(nextCell);
    this.cells.pop();
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
