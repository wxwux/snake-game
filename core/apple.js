import { Cell, types } from "./cell";
export class Apple {
  constructor(ctx) {
    this.ctx = ctx; 
  }

  render() {
    const cell = new Cell(this.ctx, {
      col: 1,
      row: 1
    }, types.APPLE);
    cell.render();
  }
}