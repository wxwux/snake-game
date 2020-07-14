import { Cell, types } from "./cell";
import { emitter, events } from "./emitter";

const directions = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
export class Snake {
  constructor(ctx, { apple }) {
    this.ctx = ctx;
    this.headCol = 8;
    this.headRow = 8;
    this.direction = directions.UP;

    this.apple = apple;

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
        // snake can't move to the opposite direction
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

  generateSnakeBody() {
    const nextCell = this.countNextCell();
    this.cells.unshift(nextCell);
    this.cells.pop();

    if (this.appleWasEaten()) {
      this.cells.unshift(nextCell);
    }

    return this.cells;
  }

  renderSnakesCells(snake) {
    snake.forEach((snakeCell) => {
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

  appleWasEaten() {
    const applePosition = this.apple.position;

    if (
      applePosition.col === this.headCol &&
      applePosition.row === this.headRow
    ) {
      emitter.emit(events.SCORE);
      return true;
    }

    return false;
  }

  render() {
    const snake = this.generateSnakeBody();
    this.renderSnakesCells(snake);
  }
}
