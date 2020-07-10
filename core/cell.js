export const types = {
  DEFAULT: "DEFAULT",
  SNAKE: "SNAKE",
  APPLE: "APPLE",
  BOMB: "BOMB",
};

export class Cell {
  constructor(ctx, position, type = types.DEFAULT) {
    this.ctx = ctx;
    this.size = 18;
    this.position = {
      col: position.col,
      row: position.row,
    };

    this.type = types[type];

    console.log(types, type, types[type]);
    
  }

  countPosition() {
    const cellSpacing = 3;
    return {
      x: ( this.size + cellSpacing ) * this.position.col,
      y: ( this.size + cellSpacing ) * this.position.row,
    };
  }

  renderSnakeType() {
    const position = this.countPosition();
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.rect(position.x, position.y, this.size, this.size);
    this.ctx.fill();
  }

  renderDefaultType() {
    const position = this.countPosition();
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.rect(position.x, position.y, this.size, this.size);
    this.ctx.stroke();
  }

  render() {
    switch(this.type) {
      case types.SNAKE :
        this.renderSnakeType();
      default: 
        this.renderDefaultType();
    }

  }
}
