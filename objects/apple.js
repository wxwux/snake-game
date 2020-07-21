import { Cell, types } from "./cell";
import { getRandomInt } from "../core/helpers";
import { emitter, events } from "../core/emitter";
import { state, objects } from "../core/state";
export class Apple {
  constructor(ctx) {
    this.ctx = ctx;

    this.setRandomPosition();

    emitter.on(events.SCORE, () => {
      this.setRandomPosition();
    });
  }

  countRandomPosition() {
    const { size: boardSize, edgeCell: boardEdge } = state.getState(
      objects.BOARD
    );
    const { position: snakeCells } = state.getState(objects.SNAKE);

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
      return this.countRandomPosition();
    } else {
      return applePosition;
    }
  }

  setRandomPosition() {
    const position = this.countRandomPosition();
    state.setState(objects.APPLE, { position });
  }

  render() {
    const { position: applePosition } = state.getState(objects.APPLE);

    const cell = new Cell(
      this.ctx,
      {
        col: applePosition.col,
        row: applePosition.row,
      },
      types.APPLE
    );
    cell.render();
  }
}
