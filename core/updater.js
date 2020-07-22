import { objects } from "../objects";
import { directions } from "./userInput";
import { getRandomInt } from "../core/helpers";
import { emitter, events } from "./emitter";

export class Updater {
  constructor(state) {
    this.state = state;
  }

  update({ direction }) {
    const newHeadPosition = this.calcNextHeadCell(direction);
    this.calcNextPosition(newHeadPosition);
    this.checkCollision(direction);

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

    return {
      [directions.UP]: () => {
        return snakeHead.row <= boardEdge
          ? { col: snakeHead.col, row: boardSize }
          : { col: snakeHead.col, row: snakeHead.row - 1 };
      },
      [directions.DOWN]: () => {
        return snakeHead.row >= boardSize
          ? { col: snakeHead.col, row: boardEdge }
          : { col: snakeHead.col, row: snakeHead.row + 1 };
      },
      [directions.RIGHT]: () => {
        return snakeHead.col >= boardSize
          ? { row: snakeHead.row, col: boardEdge }
          : { row: snakeHead.row, col: snakeHead.col + 1 };
      },
      [directions.LEFT]: () => {
        return snakeHead.col <= boardEdge
          ? { row: snakeHead.row, col: boardSize }
          : { row: snakeHead.row, col: snakeHead.col - 1 };
      },
    }[direction]();
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
      this.increaseScores();
      return true;
    }

    return false;
  }

  checkCollision(direction) {
    const { head: snakeHead, position: snakeCells } = this.state.getState(
      objects.SNAKE
    );

    const nextHeadCell = this.calcNextHeadCell(direction);

    const isHeadHitBody = snakeCells.some((bodyCell, ndx) => {
      return ndx > 0 
        ? bodyCell.col === nextHeadCell.col && bodyCell.row === nextHeadCell.row
        : false
    });

    // console.log("============");
    // console.log("sC", snakeCells);
    // console.log("sB", snakeBody);
    // console.log("sH", snakeHead);

    if (isHeadHitBody) {
      emitter.emit(events.LOSE);
    }
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
