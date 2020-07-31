import { objects } from "./index";
import {emitter, events} from "../core/emitter";
export class Scores {
  constructor(ctx) {
    this.ctx = ctx;
    this.ctx.font = "40px Share Tech Mono";
    this.color = "#222f3e";

    this.showPressText = false;
    this.showGameOverText = false;

    emitter.on(events.LOSE, () => {
      this.showPressText = true
    });

    emitter.on(events.RESTART, () => {
      this.showPressText = false
    });

    emitter.on(events.GAME_OVER, () => {
      this.showPressText = false;
      this.showGameOverText = true;
    })
  }

  renderScores(state, x, y) {
    const { scores } = state.getState(objects.SCORES);
    this.ctx.fillText("SCORES: " + scores, x, y);
  }

  renderLives(state, x, y) {
    const { lives } = state.getState(objects.SCORES);
    this.ctx.fillText("LIVES: " + lives, x, y);
  }

  renderRestartText(x, y) {
    this.ctx.fillText("PRESS SPACE TO CONTINUE", x, y)
  }

  renderGameOverText(x, y) {
    this.ctx.fillText("GAME OVER", x, y)
  }

  render(state) {
    const { size: boardSize, cell: boardCell } = state.getState(objects.BOARD);
    const positionX = (boardSize + 3) * (boardCell.size + boardCell.spacing);

    this.ctx.fillStyle = this.color;
    this.renderScores(state, positionX, 100);
    this.renderLives(state, positionX, 200);

    if (this.showPressText) {
      this.renderRestartText(positionX, 400);
    }

    if (this.showGameOverText) {
      this.renderGameOverText(positionX, 400);
    }
  }
}
