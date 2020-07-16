import { Cell, types } from "./cell";
import { getRandomInt } from "./helpers";
import { emitter, events } from "./emitter";
import { state, objects } from "./state";
export class Apple {
  constructor(ctx) {
    this.ctx = ctx;

    this.setRandomPosition();

    emitter.on(events.SCORE, () => {
      console.log('score');
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

    const appleInsideTheSnake = snakeCells.some((snakeCell) => {
      // console.log(snakeCell, applePosition);
      return (
        snakeCell.col === applePosition.col &&
        snakeCell.row === applePosition.row
      );
    });


    if (appleInsideTheSnake) {
      console.log('true');
      this.countRandomPosition();
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
