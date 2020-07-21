import { Cell } from "./cell";
import { objects } from "./index";
export class Board {
  constructor(ctx) {
    this.ctx = ctx;
  }
  render(state) {
    const { size } = state.getState(objects.BOARD);
    for (let row = 1; row <= size; row++) {
      for (let col = 1; col <= size; col++) {
        const cell = new Cell(this.ctx, { col, row });
        cell.render()
      }
    }
  }
}
