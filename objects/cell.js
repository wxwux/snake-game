import { state } from "../core/state";
import { objects } from "./index";
export const types = {
  DEFAULT: "DEFAULT",
  SNAKE: "SNAKE",
  APPLE: "APPLE",
  BOMB: "BOMB",
};

export class Cell {
  constructor(ctx, position = { col: 0, row: 0 }, type = types.DEFAULT) {
    this.ctx = ctx;

    this.size = state.getState(objects.BOARD).cell.size;
    this.spacing = state.getState(objects.BOARD).cell.spacing

    this.position = {
      col: position.col,
      row: position.row,
    };

    this.type = types[type];
  }

  countPosition() {
    return {
      x: (this.size + this.spacing) * this.position.col,
      y: (this.size + this.spacing) * this.position.row,
    };
  }

  renderSnakeType() {
    const position = this.countPosition();
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "#222f3e";
    this.ctx.rect(position.x, position.y, this.size, this.size);
    this.ctx.fill();
  }

  renderDefaultType() {
    const position = this.countPosition();
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#222f3e";
    this.ctx.rect(position.x, position.y, this.size, this.size);
    this.ctx.stroke();
  }

  renderAppleType() {
    const position = this.countPosition();
    this.ctx.beginPath();
    this.ctx.fillStyle = "#10ac84";
    this.ctx.rect(position.x, position.y, this.size, this.size);
    this.ctx.fill();
  }

  render() {
    switch (this.type) {
      case types.SNAKE:
        return this.renderSnakeType();
      case types.APPLE:
        return this.renderAppleType();
      default:
        this.renderDefaultType();
    }
  }
}
