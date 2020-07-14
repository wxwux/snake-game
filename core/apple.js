import { Cell, types } from "./cell";
import { getRandomInt } from "./helpers";
import { emitter, events } from "./emitter";
export class Apple {
  constructor(ctx) {
    this.ctx = ctx;
    this.position = {
      col: 0,
      row: 0,
    };
    this.setRandomPosition();

    this.allowRender = true;
  }

  setRandomPosition() {
    this.position.col = getRandomInt(1, 15);
    this.position.row = getRandomInt(1, 15);
  }

  render() {
    emitter.on(events.SCORE, () => {
      this.setRandomPosition();
    });

    const cell = new Cell(
      this.ctx,
      {
        col: this.position.col,
        row: this.position.row,
      },
      types.APPLE
    );
    cell.render();
  }
}
