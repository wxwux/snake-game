import { Canvas } from "./canvas";

export class Game {
  constructor(container) {
    this.canvas = new Canvas(container);
  }

  start() {
    window.requestAnimationFrame(() => {
      this.canvas.refreshScreen();
      this.canvas.board().render();
      this.canvas.snake().render();
    });
  }
}
