import { Cell, types } from "./cell";
import { objects } from "./index";
export class Apple {
  constructor(ctx) {
    this.ctx = ctx;
  }

  render(state) {
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
