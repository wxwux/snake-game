import { Cell } from "./cell";
import { state, objects } from "./state";
export class Board {
  constructor(ctx) {
    this.ctx = ctx;

    state.setState(objects.BOARD, {
      size: 15,
    });
  }

  generateCells() {
    const { size } = state.getState(objects.BOARD);
    this.cells = [];

    for (let row = 1; row <= size; row++) {
      for (let col = 1; col <= size; col++) {
        const cell = new Cell(this.ctx, { col, row });
        this.cells.push(cell);
      }
    }

    return this.cells;
  }

  renderCells() {
    this.generateCells().forEach((cell) => {
      cell.render();
    });
  }

  render() {
    this.renderCells();
  }
}
