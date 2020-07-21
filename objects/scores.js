import { state } from "../core/state";
import { emitter, events } from "../core/emitter";
import { objects } from "./index";
export class Scores {
  constructor(ctx) {
    this.ctx = ctx;
  }

  render(state) {
    const { size: boardSize, cell: boardCell } = state.getState(objects.BOARD);
    const { scores } = state.getState(objects.SCORES);
    const positionX = (boardSize + 3) * (boardCell.size + boardCell.spacing);

    this.ctx.font = "20px Share Tech Mono";
    this.ctx.fillStyle = "#222f3e";
    this.ctx.fillText("SCORES: " + scores, positionX, 50);
  }
}
