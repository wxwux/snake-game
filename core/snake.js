import { Cell, types } from "./cell";
import { emitter, events } from "./emitter";
import { state, objects } from "./state";

const directions = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
export class Snake {
  constructor(ctx, { apple }) {
    this.ctx = ctx;

    state.setState(objects.SNAKE, {
      head: {
        col: 8,
        row: 8,
      },
    });

    state.setState(objects.SNAKE, {
      position: [
        { col: 8, row: 8 },
        { col: 8, row: 9 },
        { col: 8, row: 10 },
      ],
    });

    // this.headCol = 8;
    // this.headRow = 8;
    this.direction = directions.UP;

    // this.apple = apple;

    // this.cells = [
    //   { col: this.headCol, row: this.headRow },
    //   { col: this.headCol, row: 9 },
    //   { col: this.headCol, row: 10 },
    // ];

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

  countNextHeadCell() {
    const { head: snakeHead } = state.getState(objects.SNAKE);
    const { size: boardSize, edgeCell: boardEdge } = state.getState(
      objects.BOARD
    );
    let newHeadPosition = {};

    switch (this.direction) {
      case directions.UP:
        newHeadPosition = {
          col: snakeHead.col,
          row: snakeHead.row - 1,
        };
        if (snakeHead.row <= boardEdge) {
          newHeadPosition = {
            ...newHeadPosition,
            row: boardSize,
          };
        }
        break;
      case directions.DOWN:
        newHeadPosition = {
          row: snakeHead.row + 1,
          col: snakeHead.col,
        };

        if (snakeHead.row >= boardSize) {
          newHeadPosition = {
            ...newHeadPosition,
            row: boardEdge,
          };
        }
        break;
      case directions.LEFT:
        newHeadPosition = {
          row: snakeHead.row,
          col: snakeHead.col - 1,
        };
        if (snakeHead.col <= boardEdge) {
          newHeadPosition = {
            ...newHeadPosition,
            col: boardSize,
          };
        }
        break;

      case directions.RIGHT:
        newHeadPosition = {
          row: snakeHead.row,
          col: snakeHead.col + 1,
        };

        if (snakeHead.col >= boardSize) {
          newHeadPosition = {
            ...newHeadPosition,
            col: boardEdge,
          };
        }
        break;
    }

    state.setState(objects.SNAKE, {
      head: newHeadPosition,
    });
  }

  countNextPosition() {
    this.countNextHeadCell();
    const { head: snakeHead } = state.getState(objects.SNAKE);
    const { position: snakePosition } = state.getState(objects.SNAKE);

    const newPosition = [snakeHead, ...snakePosition];

    newPosition.pop();

    state.setState(objects.SNAKE, {
      position: newPosition,
    });

    // if (this.appleWasEaten()) {
    //   this.cells.unshift(nextCell);
    // }
  }

  renderSnakesCells() {
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
    this.countNextPosition();
    this.renderSnakesCells();
  }
}
