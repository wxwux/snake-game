import { Canvas } from "./canvas";
import { emitter, events } from "./emitter";
import { UserInput } from "./userInput";
import { state } from "./state";
import { Updater } from "./updater";
import { objects } from "../objects";

const defaultFps = 300;

export class Game {
  constructor(container) {
    this.canvas = new Canvas(container);
    this.fps = defaultFps;
    this.interval = null;
    this.updater = new Updater(state);
    this.userInput = new UserInput();
  }

  renderFrame(state) {
    window.requestAnimationFrame(() => {
      this.canvas.refreshScreen();
      this.canvas.board.render(state);
      this.canvas.snake.render(state);
      this.canvas.apple.render(state);
      this.canvas.scores.render(state);
    });
  }

  renderScreen() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      const newState = this.updater.update(this.userInput);
      this.renderFrame(newState);
    }, this.fps);
  }

  start() {
    emitter.on(events.SCORE, () => {
      if (this.fps > 50) {
        this.fps -= 10;
      }

      this.renderScreen();
    });

    emitter.on(events.LOSE, () => {
      clearInterval(this.interval);
    });

    emitter.on(events.RESTART, () => {
      this.fps = defaultFps;
      state.resetState(objects.SNAKE);
      this.renderScreen();
    });

    this.renderScreen();
  }
}
