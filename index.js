import { Game } from "./core/game";

const container = document.getElementById("game-canvas");
const game = new Game(container);

window.addEventListener("load", () => {
  game.start();
});
