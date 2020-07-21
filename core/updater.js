import { objects } from "../objects";
import { directions } from "./userInput";
import { getRandomInt } from "../core/helpers";

export class Updater {
  constructor(state) {
    this.state = state
  }

  update({ direction }) {
    const newHeadPosition = this.calcNextHeadCell(direction);
    this.calcNextPosition(newHeadPosition);

    return this.state;
  }

  calcRandomPosition() {
    const { size: boardSize, edgeCell: boardEdge } = this.state.getState(
      objects.BOARD
    );
    const { position: snakeCells } = this.state.getState(objects.SNAKE);

    const applePosition = {
      col: getRandomInt(boardEdge, boardSize),
      row: getRandomInt(boardEdge, boardSize),
    };

    const isAppleInsideTheSnake = snakeCells.some((snakeCell) => {
      return (
        snakeCell.col === applePosition.col &&
        snakeCell.row === applePosition.row
      );
    });

    if (isAppleInsideTheSnake) {
      return this.calcRandomPosition();
    } else {
      return applePosition;
    }
  }

  setNewApplePosition() {
    const position = this.calcRandomPosition();
    this.state.setState(objects.APPLE, { position });
  }

  calcNextHeadCell(direction) {
    const { head: snakeHead } = this.state.getState(objects.SNAKE);
    const { size: boardSize, edgeCell: boardEdge } = this.state.getState(
      objects.BOARD
    );
    let newHeadPosition = {};

    switch (direction) {
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

    return newHeadPosition;
  }

  increaseScores() {
    const { scores } = this.state.getState(objects.SCORES);
    this.state.setState(objects.SCORES, { scores: scores + 1 });
  }

  appleWasEaten() {
    const { position: applePosition } = this.state.getState(objects.APPLE);
    const { head: snakeHead } = this.state.getState(objects.SNAKE);

    if (
      applePosition.col === snakeHead.col &&
      applePosition.row === snakeHead.row
    ) {
      this.setNewApplePosition();
      this.increaseScores()
      return true;
    }

    return false;
  }

  calcNextPosition(snakeHead) {
    const { position: snakePosition } = this.state.getState(objects.SNAKE);

    const newPosition = [snakeHead, ...snakePosition];

    this.state.setState(objects.SNAKE, {
      head: snakeHead,
    });

    this.state.setState(objects.SNAKE, {
      position: newPosition,
    });

    if (this.appleWasEaten() === false) {
      newPosition.pop();
    }
  }
}
