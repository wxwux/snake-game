import { Canvas } from "./canvas";
import { emitter, events } from "./emitter";

export class Game {
  constructor(container) {
    this.canvas = new Canvas(container);
    this.fps = 100;
  }

  updateFrame() {
    window.requestAnimationFrame(() => {
      this.canvas.refreshScreen();
      this.canvas.board.render();
      this.canvas.snake.render();
      this.canvas.apple.render();
      this.canvas.scores.render();
    });
  }

  start() {
    let interval;

    if (typeof interval !== "undefined") {
      clearInterval(interval);
    }

    // emitter.on(events.SCORE, () => {
    //   this.fps -= 100;
    //   clearInterval(interval);

    //   interval = setInterval(() => {
    //     this.updateFrame();
    //   }, this.fps);
    // });

    interval = setInterval(() => {
      this.updateFrame();
    }, this.fps);
  }
}
