import { objects } from "../objects";
import { directions } from "./userInput";
import { emitter, events } from "./emitter";

export class Updater {
  update({ direction }, state) {
    const newHeadPosition = this.calcNextHeadCell(direction, state);
    this.calcNextPosition(newHeadPosition, state);

    return state;
  }

  calcNextHeadCell(direction, state) {
    const { head: snakeHead } = state.getState(objects.SNAKE);
    const { size: boardSize, edgeCell: boardEdge } = state.getState(
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

  appleWasEaten(state) {
    const { position: applePosition } = state.getState(objects.APPLE);
    const { head: snakeHead } = state.getState(objects.SNAKE);

    if (
      applePosition.col === snakeHead.col &&
      applePosition.row === snakeHead.row
    ) {
      emitter.emit(events.SCORE);
      return true;
    }

    return false;
  }

  calcNextPosition(snakeHead, state) {
    const { position: snakePosition } = state.getState(objects.SNAKE);

    const newPosition = [snakeHead, ...snakePosition];

    state.setState(objects.SNAKE, {
      head: snakeHead,
    });

    state.setState(objects.SNAKE, {
      position: newPosition,
    });

    if (this.appleWasEaten(snakeHead, state) === false) {
      newPosition.pop();
      // newPosition.unshift(snakeHead);
    }
  }
}
