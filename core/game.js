import { Canvas } from "./canvas";
import { emitter, events } from "./emitter";
import { UserInput } from "./userInput";
import { state } from "./state";
import { Updater } from "./updater";

export class Game {
  constructor(container) {
    this.canvas = new Canvas(container);
    this.fps = 70;
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

  start() {
    let interval;
    const updater = new Updater(state);
    const userInput = new UserInput();

    if (typeof interval !== "undefined") {
      clearInterval(interval);
    }

    emitter.on(events.LOSE, () => {
      console.log("loseeeeerr");
      clearInterval(interval);
    });

    // emitter.on(events.SCORE, () => {
    //   this.fps -= 100;
    //   clearInterval(interval);

    //   interval = setInterval(() => {
    //     this.updateFrame();
    //   }, this.fps);
    // });

    interval = setInterval(() => {
      const newState = updater.update(userInput);
      this.renderFrame(newState);
    }, this.fps);
  }
}
