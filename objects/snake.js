import { Cell, types } from "./cell";
import { objects } from "./index";
import { events, emitter } from "../core/emitter";
import { state } from "../core/state";

export class Snake {
  constructor(ctx) {
    this.ctx = ctx;

    emitter.on(events.LOSE, () => {
      this.blinkTheHead(ctx);
    });
  }

  blinkTheHead(ctx) {
    const { head: snakeHead } = state.getState(objects.SNAKE);
    const snakeCell = new Cell(ctx, snakeHead, types.SNAKE);
    const emptyCell = new Cell(ctx, snakeHead, types.DEFAULT);
    let isEmpty = true;
    let counter = 0;
    let interval;

    interval = setInterval(() => {
      if (typeof interval !== "undefined" && counter === 3) {
        clearInterval(interval);
      }

      if (isEmpty) {
        emptyCell.render();
      } else {
        snakeCell.render();
      }

      isEmpty = !isEmpty;
      counter++;
    }, 100);
  }

  render(state) {
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
}
