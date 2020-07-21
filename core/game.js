import { Canvas } from "./canvas";
import { emitter, events } from "./emitter";
import { UserInput } from "./userInput";
import { state } from "./state";

export class Game {
  constructor(container) {
    this.canvas = new Canvas(container);
    this.fps = 1000;
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
    const userInput = new UserInput();
    const gameState = state.getState();

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
      // console.log(userInput);
      // console.log(gameState); 
      // const state = state.update(userInput, gameState);
      this.renderFrame(state)
    }, this.fps);
  }
}
