import { Cell } from "./cell";
export class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.size = 15;
  }

  generateCells() {
    this.cells = [];
    for (let row = 1; row <= this.size; row++) {
      for (let col = 1; col <= this.size; col++) {
        const cell = new Cell(this.ctx, { col, row });
        this.cells.push(cell);
      }
    }

    return this.cells;
  }

  renderCells() {
    this.generateCells().forEach(cell => {
      cell.render();
    });
  }

  render() {
    this.renderCells();
  }
}
