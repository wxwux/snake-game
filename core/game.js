import { Canvas } from "./canvas";

export class Game {
  constructor(container) {
    this.canvas = new Canvas(container);
  }

  updateFrame() {
    window.requestAnimationFrame(() => {
      this.canvas.refreshScreen();
      this.canvas.board.render();
      this.canvas.snake.render();
      this.canvas.apple.render();
    });
  }

  start() {
    let interval;

    if (typeof interval !== "undefined") {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      this.updateFrame(); 
    }, 100);
  }
}
