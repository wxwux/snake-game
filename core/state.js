import { objects } from "../objects";

export const initialState = {
  [objects.SNAKE]: {
    head: {
      col: 8,
      row: 8,
    },
    position: [
      { col: 8, row: 8 },
      { col: 8, row: 9 },
      { col: 8, row: 10 },
    ],
  },
  [objects.BOARD]: {
    size: 15,
    edgeCell: 1,
    cell: {
      size: 36,
      spacing: 6,
    },
  },
  [objects.APPLE]: {
    position: {
      col: 0,
      row: 0
    }
  },
  [objects.SCORES] : {
    scores: 0
  }
};

class State {
  constructor(initialState = {}) {
    this.state = initialState;
  }

  setState(type, data) {
    this.state[type] = { ...this.state[type], ...data };
  }

  getState(type) {
    if (type && this.state.hasOwnProperty(type) === false) {
      throw new Error(
        `you are trying to get property ${type} which is not set in state`
      );
    }

    return type ? this.state[type] : this;
  }

}

export const state = new State(initialState);
