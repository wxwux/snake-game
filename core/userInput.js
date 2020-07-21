export const directions = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export class UserInput {
  constructor() {
    this.direction = directions.UP;

    document.addEventListener("keydown", (e) => {
      this.detectDirection(e.keyCode);
    });
  }

  setDirection() {
    return {
      up: () => {
        // snake can't move to the opposite direction
        if (this.direction === directions.DOWN) {
          return (this.direction = directions.DOWN);
        }
        this.direction = directions.UP;
      },
      down: () => {
        if (this.direction === directions.UP) {
          return (this.direction = directions.UP);
        }
        this.direction = directions.DOWN;
      },
      left: () => {
        if (this.direction === directions.RIGHT) {
          return (this.direction = directions.RIGHT);
        }
        this.direction = directions.LEFT;
      },
      right: () => {
        if (this.direction === directions.LEFT) {
          return (this.direction = directions.LEFT);
        }
        this.direction = directions.RIGHT;
      },
    };
  }

  detectDirection(keyCode) {
    const direction = this.setDirection();
    switch (keyCode) {
      case 38:
        direction.up();
        break;
      case 40:
        direction.down();
        break;
      case 37:
        direction.left();
        break;
      case 39:
        direction.right();
        break;
    }
  }
}
